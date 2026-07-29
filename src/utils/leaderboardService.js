/**
 * Supabase Online Leaderboard Service
 * Menggunakan Supabase REST API secara langsung (tanpa SDK) agar bundle tetap kecil.
 * Table: leaderboard (id, name, stage, total_matches, difficulty, created_at)
 *
 * Pembersihan database otomatis dilakukan oleh PostgreSQL Trigger di Supabase:
 * setiap INSERT baru, trigger langsung menghapus baris di luar Top 10.
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const TABLE_ENDPOINT = `${SUPABASE_URL}/rest/v1/leaderboard`;

const HEADERS = {
  'apikey': SUPABASE_ANON_KEY,
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=minimal'
};

/** Hanya simpan jika skor LAYAK masuk Top 10 (cek dulu sebelum insert) */
const TOP_LIMIT = 10;

/**
 * Hapus otomatis baris di Supabase yang berada di luar Top 10 (peringkat 11 ke bawah)
 * @param {Array} extraItems
 */
const pruneExtraDatabaseScores = async (extraItems) => {
  if (!extraItems || extraItems.length === 0) return;
  const ids = extraItems.map((item) => item.id).filter(Boolean);
  if (ids.length === 0) return;

  try {
    const deleteParams = new URLSearchParams({
      id: `in.(${ids.join(',')})`
    });
    await fetch(`${TABLE_ENDPOINT}?${deleteParams}`, {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
  } catch (err) {
    console.warn('[Leaderboard] Automatic database cleanup note:', err.message);
  }
};

/**
 * Submit skor pemain ke Supabase.
 * Hanya mengirim jika skor masuk Top 10 (optimasi: tidak insert data yang tidak perlu).
 * @param {{ name: string, stage: number, totalMatches: number, difficulty: string }} entry
 */
export const submitScore = async (entry) => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return;

  try {
    // Cek apakah skor ini layak masuk Top 10 sebelum insert
    const currentTop = await fetchTopScores(TOP_LIMIT);
    const lowestTop = currentTop[currentTop.length - 1];
    const isTableFull = currentTop.length >= TOP_LIMIT;

    // Jika tabel sudah penuh, cek apakah skor ini lebih baik dari yang paling rendah
    if (isTableFull && lowestTop) {
      const entryIsWorse =
        entry.stage < lowestTop.stage ||
        (entry.stage === lowestTop.stage && (entry.totalMatches || 0) <= lowestTop.total_matches);
      if (entryIsWorse) return; // Tidak insert, skor tidak cukup tinggi
    }

    await fetch(TABLE_ENDPOINT, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        name: entry.name || 'Cyber Hero',
        stage: entry.stage || 1,
        total_matches: entry.totalMatches || 0,
        difficulty: entry.difficulty || 'Otomatis'
      })
    });

    // Jalankan pembersihan database otomatis setelah submit
    await fetchTopScores(TOP_LIMIT);
  } catch (err) {
    // Gagal silently — jangan ganggu gameplay
    console.warn('[Leaderboard] Gagal mengirim skor online:', err.message);
  }
};

/**
 * Ambil top 10 skor global dari Supabase.
 * Otomatis menghapus baris ke-11 dan seterusnya dari database Supabase.
 * @param {number} limit - Jumlah skor yang diambil (default 10)
 * @returns {Promise<Array>} Daftar skor terurut Stage DESC, Total Match DESC (Maksimal 10)
 */
export const fetchTopScores = async (limit = TOP_LIMIT) => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return [];

  const targetLimit = Math.min(limit, TOP_LIMIT);

  // Ambil hingga 50 data untuk mendeteksi dan membersihkan entri di luar Top 10
  const params = new URLSearchParams({
    select: 'id,name,stage,total_matches,difficulty,created_at',
    order: 'stage.desc,total_matches.desc',
    limit: '50'
  });

  const res = await fetch(`${TABLE_ENDPOINT}?${params}`, {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    }
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const allScores = await res.json();

  if (Array.isArray(allScores) && allScores.length > targetLimit) {
    const topScores = allScores.slice(0, targetLimit);
    const extraScores = allScores.slice(targetLimit);
    // Hapus otomatis peringkat 11+ dari Supabase di background
    pruneExtraDatabaseScores(extraScores);
    return topScores;
  }

  return allScores || [];
};

/**
 * Format waktu relatif (contoh: "2 jam lalu", "baru saja")
 * @param {string} isoString
 */
export const formatRelativeTime = (isoString) => {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return 'Baru saja';
  if (diffMin < 60) return `${diffMin} menit lalu`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} jam lalu`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay} hari lalu`;
};
