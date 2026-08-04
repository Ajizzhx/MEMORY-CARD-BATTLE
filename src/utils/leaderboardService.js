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
const BOSS_TABLE_ENDPOINT = `${SUPABASE_URL}/rest/v1/boss_leaderboard`;

const HEADERS = {
  'apikey': SUPABASE_ANON_KEY,
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=minimal'
};

/** Hanya simpan jika skor LAYAK masuk Top 10 (cek dulu sebelum insert) */
const TOP_LIMIT = 10;

/**
 * Sanitasi string input untuk mencegah XSS/HTML Injection
 * @param {string} str 
 */
const sanitizeInput = (str) => {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>&"'/]/g, '').trim().substring(0, 15);
};

/**
 * Submit skor pemain ke Supabase.
 * Hanya mengirim jika skor masuk Top 10 (optimasi: tidak insert data yang tidak perlu).
 * Pembersihan baris 11+ ditangani otomatis oleh PostgreSQL Trigger di Supabase.
 * @param {{ name: string, stage: number, totalMatches: number, difficulty: string }} entry
 */
export const submitScore = async (entry) => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return;

  const cleanName = sanitizeInput(entry.name) || 'Cyber Hero';
  const cleanStage = Number(entry.stage) || 1;
  const cleanMatches = Number(entry.totalMatches) || 0;

  // Basic Payload Sanity Checks (Mencegah POST skor palsu / manipulasi ekstrem)
  if (cleanStage < 1 || cleanMatches < 0) {
    console.warn('[Leaderboard] Invalid payload blocked.');
    return;
  }

  try {
    // Cek apakah skor ini layak masuk Top 10 sebelum insert
    const currentTop = await fetchTopScores(TOP_LIMIT);
    const lowestTop = currentTop[currentTop.length - 1];
    const isTableFull = currentTop.length >= TOP_LIMIT;

    // Jika tabel sudah penuh, cek apakah skor ini lebih baik dari yang paling rendah
    if (isTableFull && lowestTop) {
      const isBetterStage = cleanStage > lowestTop.stage;
      const isSameStageFewerMatches = cleanStage === lowestTop.stage && cleanMatches < lowestTop.total_matches;

      if (!isBetterStage && !isSameStageFewerMatches) {
        return; // Tidak layak masuk Top 10
      }
    }

    // Insert ke Supabase
    await fetch(TABLE_ENDPOINT, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        name: cleanName,
        stage: cleanStage,
        total_matches: cleanMatches,
        difficulty: entry.difficulty || 'Auto'
      })
    });
  } catch (err) {
    console.warn('[Leaderboard] Gagal submit skor ke Supabase:', err.message);
  }
};

/**
 * Ambil top 10 skor RPG global dari Supabase.
 * @param {number} targetLimit 
 * @returns {Promise<Array>}
 */
export const fetchTopScores = async (targetLimit = TOP_LIMIT) => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return [];

  const params = new URLSearchParams({
    select: 'id,name,stage,total_matches,difficulty,created_at',
    order: 'stage.desc,total_matches.desc',
    limit: String(targetLimit)
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
  return Array.isArray(allScores) ? allScores.slice(0, targetLimit) : [];
};

/**
 * Submit skor pemain Boss Challenge ke Supabase.
 * @param {Object} scoreData { name, difficulty, elapsed_ms, total_matches }
 */
export const submitBossScore = async (scoreData) => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return;

  const cleanName = sanitizeInput(scoreData.name) || 'Cyber Hero';
  const cleanElapsed = Number(scoreData.elapsedMs) || 0;
  const cleanMatches = Number(scoreData.totalMatches) || 0;

  // Basic Payload Sanity Checks
  if (cleanElapsed <= 0 || cleanMatches < 0) {
    console.warn('[Boss Leaderboard] Invalid payload blocked.');
    return;
  }

  try {
    // 1. Cek apakah skor layak masuk Top 10 (lebih cepat dari peringkat 10)
    const currentTop = await fetchBossScores(TOP_LIMIT);
    if (currentTop.length >= TOP_LIMIT) {
      const lowestScore = currentTop[currentTop.length - 1];
      if (cleanElapsed > lowestScore.elapsed_ms) {
        return; // Tidak masuk Top 10 (waktu lebih lama)
      }
    }

    // 2. Insert jika layak (database akan auto-prune via PostgreSQL Trigger)
    await fetch(BOSS_TABLE_ENDPOINT, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        name: cleanName,
        difficulty: scoreData.difficulty || 'Auto',
        elapsed_ms: cleanElapsed,
        total_matches: cleanMatches
      })
    });
  } catch (err) {
    console.warn('[Boss Leaderboard] Gagal submit skor ke Supabase:', err.message);
  }
};

/**
 * Ambil top 10 skor Boss global dari Supabase.
 * @param {number} targetLimit 
 * @returns {Promise<Array>}
 */
export const fetchBossScores = async (targetLimit = TOP_LIMIT) => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return [];

  const params = new URLSearchParams({
    select: 'id,name,elapsed_ms,total_matches,difficulty,created_at',
    order: 'elapsed_ms.asc,total_matches.asc',
    limit: String(targetLimit)
  });

  const res = await fetch(`${BOSS_TABLE_ENDPOINT}?${params}`, {
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
  return Array.isArray(allScores) ? allScores.slice(0, targetLimit) : [];
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
