// Suspenseful Background Music Synthesizer
// Recreates the dramatic clock-ticking and tense pizzicato strings soundtrack

class BackgroundMusicEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private volume: number = 0.45;
  private masterGain: GainNode | null = null;
  private timerLoop: number | null = null;
  private tempoBpm: number = 88; // Suspenseful steady tempo
  private step: number = 0;

  // Scale: Dark harmonic minor (D minor / F / G# suspense)
  private bassNotes = [146.83, 138.59, 130.81, 123.47]; // D3, C#3, C3, B2
  private pizzNotes = [
    293.66, 349.23, 440.0, 415.3, 392.0, 349.23, 311.13, 293.66
  ];

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  public play() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.step = 0;
    this.scheduleNextTick();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerLoop) {
      window.clearTimeout(this.timerLoop);
      this.timerLoop = null;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  private scheduleNextTick() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const secondsPerBeat = 60 / this.tempoBpm;
    const subdivision = secondsPerBeat / 2; // Eighth note subdivisions
    const now = this.ctx.currentTime;

    // 1. Mechanical Clock Tick
    this.playClockTick(now, this.step % 2 === 0);

    // 2. Suspenseful Pizzicato String Pluck
    if (this.step % 2 === 0) {
      const noteIdx = (this.step / 2) % this.pizzNotes.length;
      const freq = this.pizzNotes[noteIdx];
      this.playPizzicatoPluck(now, freq);
    }

    // 3. Deep Cinematic Bass Drone
    if (this.step % 16 === 0) {
      const bassIdx = Math.floor(this.step / 16) % this.bassNotes.length;
      this.playCelloBass(now, this.bassNotes[bassIdx]);
    }

    this.step++;
    const ms = subdivision * 1000;
    this.timerLoop = window.setTimeout(() => this.scheduleNextTick(), ms);
  }

  // Crisp mechanical clock tick
  private playClockTick(time: number, isDownbeat: boolean) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(isDownbeat ? 1400 : 1800, time);
    osc.frequency.exponentialRampToValueAtTime(100, time + 0.025);

    gain.gain.setValueAtTime(isDownbeat ? 0.08 : 0.04, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.025);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.025);
  }

  // Tense pizzicato string pluck
  private playPizzicatoPluck(time: number, freq: number) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    // Soft lowpass filter to simulate acoustic string body
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, time);
    filter.frequency.exponentialRampToValueAtTime(200, time + 0.2);

    gain.gain.setValueAtTime(0.07, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.22);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.22);
  }

  // Low ominous cello drone
  private playCelloBass(time: number, freq: number) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, time);

    gain.gain.setValueAtTime(0.09, time);
    gain.gain.linearRampToValueAtTime(0.12, time + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 2.8);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 2.8);
  }
}

export const bgMusic = new BackgroundMusicEngine();
