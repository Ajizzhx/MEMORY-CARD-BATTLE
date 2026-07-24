/**
 * Supabase Online Leaderboard Service
 * Menggunakan Supabase REST API secara langsung (tanpa SDK) agar bundle tetap kecil.
 * Table: leaderboard (id, name, stage, total_matches, difficulty, created_at)
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

/**
 * Submit skor pemain ke Supabase (fire-and-forget, tidak block gameplay)
 * @param {{ name: string, stage: number, totalMatches: number, difficulty: string }} entry
 */
export const submitScore = async (entry) => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return;

  try {
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
  } catch (err) {
    // Gagal silently — jangan ganggu gameplay
    console.warn('[Leaderboard] Gagal mengirim skor online:', err.message);
  }
};

/**
 * Ambil top N skor global dari Supabase
 * @param {number} limit - Jumlah skor yang diambil (default 25)
 * @returns {Promise<Array>} Daftar skor terurut Stage DESC, Total Match DESC
 */
export const fetchTopScores = async (limit = 25) => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return [];

  const params = new URLSearchParams({
    select: 'name,stage,total_matches,difficulty,created_at',
    order: 'stage.desc,total_matches.desc',
    limit: String(limit)
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

  return res.json();
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
