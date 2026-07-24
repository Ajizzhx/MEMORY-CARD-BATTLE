/**
 * Sound & Music System untuk Memory Card Battle (Cyberfantasy Edition)
 * Menggunakan Web Audio API Synthesizer murni:
 * - Ambient Cyberfantasy Relaxing BGM (Pad Chords & Soft LFO - Terdengar Jelas, Mantap & Menenangkan)
 * - SFX Responsif & Keras (Flip, Match Chime, Heal Sparkle, Attack Punch, Block Shield, Stage Clear, Shuffle, Defeat)
 * - Bebas 404/Asset Loading Error pada Vercel/Netlify.
 */

class SoundSystem {
  constructor() {
    this.ctx = null;
    this.bgmGainNode = null;
    this.sfxGainNode = null;
    this.masterGainNode = null;

    this.isBgmMuted = localStorage.getItem('memory_bgm_muted') === 'true';
    this.isSfxMuted = localStorage.getItem('memory_sfx_muted') === 'true';

    this.isBgmPlaying = false;
    this.bgmOscillators = [];
    this.bgmInterval = null;
  }

  // Inisialisasi AudioContext saat ada interaksi pertama pemain
  initAudioContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();

        this.masterGainNode = this.ctx.createGain();
        this.masterGainNode.gain.setValueAtTime(1.5, this.ctx.currentTime);
        this.masterGainNode.connect(this.ctx.destination);

        this.bgmGainNode = this.ctx.createGain();
        // Volume BGM ditingkatkan ke 0.65 agar terdengar lebih mantap & jelas
        this.bgmGainNode.gain.setValueAtTime(this.isBgmMuted ? 0 : 0.65, this.ctx.currentTime);
        this.bgmGainNode.connect(this.masterGainNode);

        this.sfxGainNode = this.ctx.createGain();
        // Volume SFX ditingkatkan ke 0.75 agar lebih bertenaga
        this.sfxGainNode.gain.setValueAtTime(this.isSfxMuted ? 0 : 0.75, this.ctx.currentTime);
        this.sfxGainNode.connect(this.masterGainNode);
      }
    } else if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // --- CONTROLS TOGGLE ---
  toggleBgm() {
    this.isBgmMuted = !this.isBgmMuted;
    localStorage.setItem('memory_bgm_muted', this.isBgmMuted);

    if (this.bgmGainNode && this.ctx) {
      this.bgmGainNode.gain.linearRampToValueAtTime(
        this.isBgmMuted ? 0 : 0.65,
        this.ctx.currentTime + 0.3
      );
    }

    if (!this.isBgmMuted && !this.isBgmPlaying) {
      this.startBgm();
    }

    return !this.isBgmMuted;
  }

  toggleSfx() {
    this.isSfxMuted = !this.isSfxMuted;
    localStorage.setItem('memory_sfx_muted', this.isSfxMuted);

    if (this.sfxGainNode && this.ctx) {
      this.sfxGainNode.gain.setValueAtTime(this.isSfxMuted ? 0 : 0.75, this.ctx.currentTime);
    }

    return !this.isSfxMuted;
  }

  // --- AMBIENT RELAXING CYBERFANTASY BGM ---
  startBgm() {
    this.initAudioContext();
    if (!this.ctx || this.isBgmPlaying) return;

    this.isBgmPlaying = true;

    // Chord Progression Harmonis & Menenangkan (Cmaj7 -> Am9 -> Fmaj7 -> Gsus4)
    const chords = [
      [261.63, 329.63, 392.00, 493.88, 523.25], // Cmaj7 (C4, E4, G4, B4, C5)
      [220.00, 261.63, 329.63, 392.00, 440.00], // Am9   (A3, C4, E4, G4, A4)
      [174.61, 261.63, 329.63, 440.00, 523.25], // Fmaj7 (F3, C4, E4, A4, C5)
      [196.00, 261.63, 392.00, 523.25, 587.33]  // Gsus4 (G3, C4, G4, C5, D5)
    ];

    let chordIndex = 0;

    const playNextChord = () => {
      if (!this.isBgmPlaying || !this.ctx) return;

      const currentNotes = chords[chordIndex];
      chordIndex = (chordIndex + 1) % chords.length;

      const now = this.ctx.currentTime;
      const duration = 4.2; // Durasi tiap pad chord

      // 1. Synth Pad Harmonis (Volume Ditingkatkan ke 0.18)
      currentNotes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Lowpass Filter jernih & hangat (1400 Hz)
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, now);
        filter.Q.setValueAtTime(1.5, now);

        // Soft Envelope Fade In & Fade Out
        noteGain.gain.setValueAtTime(0, now);
        noteGain.gain.linearRampToValueAtTime(0.18, now + 1.0);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(this.bgmGainNode);

        osc.start(now);
        osc.stop(now + duration);
      });

      // 2. Sentuhan Arpeggio Melodis Lembut (Volume Ditingkatkan ke 0.12)
      const arpeggioNotes = [currentNotes[1], currentNotes[3], currentNotes[4]];
      arpeggioNotes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + 1.2 + idx * 0.4);

        noteGain.gain.setValueAtTime(0, now + 1.2 + idx * 0.4);
        noteGain.gain.linearRampToValueAtTime(0.12, now + 1.3 + idx * 0.4);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2 + idx * 0.4);

        osc.connect(noteGain);
        noteGain.connect(this.bgmGainNode);

        osc.start(now + 1.2 + idx * 0.4);
        osc.stop(now + 2.2 + idx * 0.4);
      });
    };

    playNextChord();
    this.bgmInterval = setInterval(playNextChord, 4000);
  }

  stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  // --- SOUND EFFECTS (SFX) SYNTHESIZERS ---

  // 1. Flip Kartu (Soft Tap - Gain 0.35)
  playFlipSFX() {
    this.initAudioContext();
    if (!this.ctx || this.isSfxMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(360, now);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.08);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.sfxGainNode);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  // 2. Match Cocok (Crystalline Chime - Gain 0.38)
  playMatchSFX() {
    this.initAudioContext();
    if (!this.ctx || this.isSfxMuted) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.38, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.6);

      osc.connect(gain);
      gain.connect(this.sfxGainNode);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.6);
    });
  }

  // 3. Mismatch (Soft Gentle Pulse - Gain 0.32)
  playMismatchSFX() {
    this.initAudioContext();
    if (!this.ctx || this.isSfxMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.25);

    gain.gain.setValueAtTime(0.32, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.sfxGainNode);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  // 4. Attack Damage (Soft Bass Punch - Gain 0.45)
  playAttackSFX() {
    this.initAudioContext();
    if (!this.ctx || this.isSfxMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.3);

    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.sfxGainNode);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  // 5. Heal HP (Sparkle Ascending Chime - Gain 0.38)
  playHealSFX() {
    this.initAudioContext();
    if (!this.ctx || this.isSfxMuted) return;

    const notes = [659.25, 783.99, 987.77, 1318.51]; // E5, G5, B5, E6
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gain.gain.setValueAtTime(0.38, now + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.7);

      osc.connect(gain);
      gain.connect(this.sfxGainNode);

      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.7);
    });
  }

  // 6. Defense Block (Shield Resonance - Gain 0.38)
  playBlockSFX() {
    this.initAudioContext();
    if (!this.ctx || this.isSfxMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);

    gain.gain.setValueAtTime(0.38, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.sfxGainNode);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  // 7. Stage Clear / Victory (Euphoric Fanfare - Gain 0.48)
  playVictorySFX() {
    this.initAudioContext();
    if (!this.ctx || this.isSfxMuted) return;

    const fanfare = [
      { note: 523.25, time: 0 },    // C5
      { note: 659.25, time: 0.12 }, // E5
      { note: 783.99, time: 0.24 }, // G5
      { note: 1046.50, time: 0.40 } // C6
    ];

    const now = this.ctx.currentTime;

    fanfare.forEach((item) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(item.note, now + item.time);

      gain.gain.setValueAtTime(0.48, now + item.time);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + item.time + 0.8);

      osc.connect(gain);
      gain.connect(this.sfxGainNode);

      osc.start(now + item.time);
      osc.stop(now + item.time + 0.8);
    });
  }

  // 8. General Button Click (Gain 0.28)
  playClickSFX() {
    this.initAudioContext();
    if (!this.ctx || this.isSfxMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(650, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.04);

    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.sfxGainNode);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  // 9. Card Dealer Shuffle Sound (Riffle & Deal Sweep - Gain 0.32)
  playShuffleSFX() {
    this.initAudioContext();
    if (!this.ctx || this.isSfxMuted) return;

    const now = this.ctx.currentTime;
    for (let i = 0; i < 8; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(380 + Math.random() * 220, now + i * 0.04);
      osc.frequency.exponentialRampToValueAtTime(140, now + i * 0.04 + 0.06);

      gain.gain.setValueAtTime(0.32, now + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.06);

      osc.connect(gain);
      gain.connect(this.sfxGainNode);

      osc.start(now + i * 0.04);
      osc.stop(now + i * 0.04 + 0.06);
    }
  }

  // 10. Game Over / Defeat Sound (Dramatic Low-Pitch Pulse - Gain 0.52)
  playDefeatSFX() {
    this.initAudioContext();
    if (!this.ctx || this.isSfxMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.85);

    gain.gain.setValueAtTime(0.52, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

    osc.connect(gain);
    gain.connect(this.sfxGainNode);

    osc.start(now);
    osc.stop(now + 0.85);
  }
}

export const soundManager = new SoundSystem();
