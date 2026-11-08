/**
 * The audio engine: one AudioContext and the mix bus every sound plays into.
 *
 *   instruments ──► panner ──► dry bus ───────────────► compressor ──► limiter ──► speakers
 *                          └─► reverb send ──► room ──┘
 *
 * It also owns a few buffers built once and shared by every hit: white noise,
 * and "metal" (inharmonic square waves, the classic 808 cymbal recipe).
 */

/** iOS: is this an iPhone/iPad (including iPadOS, which reports as a Mac)? */
const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.userAgent.includes("Macintosh") && navigator.maxTouchPoints > 1);

/** A short silent WAV, built in memory. */
function silentWavUrl(): string {
  const rate = 8000;
  const samples = 800; // 0.1 s
  const buf = new ArrayBuffer(44 + samples);
  const v = new DataView(buf);
  const str = (o: number, s: string) => [...s].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
  str(0, "RIFF");
  v.setUint32(4, 36 + samples, true);
  str(8, "WAVEfmt ");
  v.setUint32(16, 16, true);
  v.setUint16(20, 1, true); // PCM
  v.setUint16(22, 1, true); // mono
  v.setUint32(24, rate, true);
  v.setUint32(28, rate, true);
  v.setUint16(32, 1, true);
  v.setUint16(34, 8, true); // 8-bit
  str(36, "data");
  v.setUint32(40, samples, true);
  for (let i = 0; i < samples; i++) v.setUint8(44 + i, 128); // 8-bit silence is 128
  return URL.createObjectURL(new Blob([buf], { type: "audio/wav" }));
}

class AudioEngine {
  private ac: AudioContext | null = null;
  private dryBus: GainNode | null = null;
  private reverbBus: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private metalBuffer: AudioBuffer | null = null;
  private unlockEl: HTMLAudioElement | null = null;

  /** Call from a user gesture (click, tap, key). Returns false if audio isn't available. */
  public init(): boolean {
    this.unlockIOS();
    if (this.ac) {
      if (this.ac.state !== "running") this.ac.resume().catch(() => {});
      return true;
    }
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ac = new AudioCtx({ latencyHint: "interactive" });
      this.ac = ac;

      // Master: gentle glue compression, then a fast soft limiter to catch peaks.
      const glue = ac.createDynamicsCompressor();
      glue.threshold.value = -18;
      glue.knee.value = 12;
      glue.ratio.value = 3;
      glue.attack.value = 0.01;
      glue.release.value = 0.2;

      const limiter = ac.createDynamicsCompressor();
      limiter.threshold.value = -3;
      limiter.knee.value = 0;
      limiter.ratio.value = 20;
      limiter.attack.value = 0.002;
      limiter.release.value = 0.08;

      const master = ac.createGain();
      master.gain.value = 0.9;
      glue.connect(limiter).connect(master).connect(ac.destination);

      this.dryBus = ac.createGain();
      this.dryBus.connect(glue);

      // A small, warm room: generated impulse response, darkened by a lowpass.
      const room = ac.createConvolver();
      room.buffer = this.makeImpulse(ac, 1.8, 3.2);
      const roomTone = ac.createBiquadFilter();
      roomTone.type = "lowpass";
      roomTone.frequency.value = 5500;
      const roomLevel = ac.createGain();
      roomLevel.gain.value = 0.55;
      this.reverbBus = ac.createGain();
      this.reverbBus.connect(room).connect(roomTone).connect(roomLevel).connect(glue);

      this.noiseBuffer = this.makeNoise(ac);
      this.metalBuffer = this.makeMetal(ac);
      return true;
    } catch {
      return false;
    }
  }

  /** Sound switched off: let iOS go back to its normal (ambient) audio behaviour. */
  public release() {
    this.unlockEl?.pause();
  }

  /**
   * iOS plays Web Audio as "ambient" sound, which the ring/silent switch mutes.
   * Declaring the page a media player fixes it: natively on Safari 16.4+
   * (navigator.audioSession), and on older iOS by playing a silent <audio>
   * element. Only done on iOS, so other browsers don't show a "now playing" control.
   */
  private unlockIOS() {
    if (!isIOS()) return;
    const session = (navigator as Navigator & { audioSession?: { type: string } }).audioSession;
    if (session) {
      try {
        session.type = "playback";
        return;
      } catch {}
    }
    if (!this.unlockEl) {
      this.unlockEl = new Audio(silentWavUrl());
      this.unlockEl.loop = true;
      this.unlockEl.setAttribute("playsinline", "");
    }
    this.unlockEl.play().catch(() => {});
  }

  private makeNoise(ac: AudioContext): AudioBuffer {
    const buf = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }

  /** Six square waves at inharmonic ratios: the metallic core of 808 hats and cymbals. */
  private makeMetal(ac: AudioContext): AudioBuffer {
    const buf = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
    const d = buf.getChannelData(0);
    const freqs = [205.3, 304.4, 369.6, 522.7, 540, 800].map((f) => f * 1.6);
    for (let i = 0; i < d.length; i++) {
      const t = i / ac.sampleRate;
      let s = 0;
      for (const f of freqs) s += (t * f) % 1 < 0.5 ? 1 : -1;
      d[i] = s / freqs.length;
    }
    return buf;
  }

  /** Stereo noise with an exponential decay: a cheap, convincing room. */
  private makeImpulse(ac: AudioContext, seconds: number, decay: number): AudioBuffer {
    const len = Math.floor(ac.sampleRate * seconds);
    const buf = ac.createBuffer(2, len, ac.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
    }
    return buf;
  }

  public get context(): AudioContext | null {
    return this.ac;
  }

  /** Dry input of the mix bus. */
  public get destination(): AudioNode | null {
    return this.dryBus;
  }

  /** Reverb send of the mix bus. */
  public get reverb(): AudioNode | null {
    return this.reverbBus;
  }

  public get noise(): AudioBuffer | null {
    return this.noiseBuffer;
  }

  public get metal(): AudioBuffer | null {
    return this.metalBuffer;
  }
}

export const audioEngine = new AudioEngine();
