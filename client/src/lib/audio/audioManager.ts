import { Howl } from 'howler';

class AudioManager {
  private sounds: Record<string, Howl> = {};
  private enabled: boolean = true;
  private audioContext: AudioContext | null = null;

  constructor() {
    this.initializeSounds();
    this.initAudioContext();
  }

  private initAudioContext() {
    if (typeof window !== 'undefined') {
      try {
        const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
        this.audioContext = new AudioContextClass();
      } catch (e) {
        console.warn('AudioContext no disponible');
      }
    }
  }

  private initializeSounds() {
    // Boot sound
    this.sounds.boot = new Howl({
      src: ['/audio/boot.wav'],
      volume: 0.5,
    });

    // Start sound
    this.sounds.start = new Howl({
      src: ['/audio/start.wav'],
      volume: 0.3,
    });

    // Click sound
    this.sounds.click = new Howl({
      src: ['/audio/click.wav'],
      volume: 0.2,
    });

    // Window open sound
    this.sounds.windowOpen = new Howl({
      src: ['/audio/window-open.wav'],
      volume: 0.3,
    });

    // Background music
    this.sounds.music = new Howl({
      src: ['/audio/piano-chiptune.mp3'],
      volume: 0.1,
      loop: true,
    });
  }

  /**
   * Reproduce un sonido sintetizado
   */
  private playTone(frequency: number, duration: number, volume: number = 0.3) {
    if (!this.audioContext || !this.enabled) return;

    try {
      const ctx = this.audioContext;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn('Error al reproducir tono:', e);
    }
  }

  playBoot() {
    if (this.enabled && this.sounds.boot) {
      this.sounds.boot.play();
    }
  }

  playStart() {
    if (this.enabled && this.sounds.start) {
      this.sounds.start.play();
    }
  }

  playClick() {
    if (this.enabled && this.sounds.click) {
      this.sounds.click.play();
    }
    // Fallback a tono sintetizado
    this.playTone(800, 0.05, 0.2);
  }

  playWindowOpen() {
    if (this.enabled && this.sounds.windowOpen) {
      this.sounds.windowOpen.play();
    }
    // Fallback a tono sintetizado
    this.playTone(400, 0.1, 0.2);
    setTimeout(() => this.playTone(600, 0.1, 0.2), 50);
  }

  /**
   * Sonido de ventana cerrada
   */
  playWindowClose() {
    this.playTone(600, 0.05, 0.2);
    setTimeout(() => this.playTone(400, 0.05, 0.2), 50);
  }

  /**
   * Sonido de notificación MSN (ding)
   */
  playNotification() {
    this.playTone(1000, 0.1, 0.3);
    setTimeout(() => this.playTone(1200, 0.1, 0.3), 100);
  }

  /**
   * Sonido de mensaje recibido
   */
  playMessageReceived() {
    this.playTone(600, 0.08, 0.25);
    setTimeout(() => this.playTone(800, 0.08, 0.25), 80);
    setTimeout(() => this.playTone(1000, 0.08, 0.25), 160);
  }

  /**
   * Sonido de error
   */
  playError() {
    this.playTone(300, 0.1, 0.3);
    setTimeout(() => this.playTone(200, 0.1, 0.3), 100);
  }

  /**
   * Sonido de éxito
   */
  playSuccess() {
    this.playTone(800, 0.1, 0.3);
    setTimeout(() => this.playTone(1000, 0.1, 0.3), 100);
    setTimeout(() => this.playTone(1200, 0.15, 0.3), 200);
  }

  /**
   * Sonido de zumbido (vibración)
   */
  playBuzz() {
    this.playTone(150, 0.05, 0.2);
    setTimeout(() => this.playTone(150, 0.05, 0.2), 60);
    setTimeout(() => this.playTone(150, 0.05, 0.2), 120);
  }

  /**
   * Sonido de escritura (máquina de escribir)
   */
  playTypewriter() {
    this.playTone(600, 0.03, 0.15);
  }

  /**
   * Sonido de minijuego (game over)
   */
  playGameOver() {
    this.playTone(400, 0.1, 0.3);
    setTimeout(() => this.playTone(300, 0.1, 0.3), 100);
    setTimeout(() => this.playTone(200, 0.2, 0.3), 200);
  }

  /**
   * Sonido de puntuación en minijuego
   */
  playScore() {
    this.playTone(1000, 0.05, 0.2);
    setTimeout(() => this.playTone(1200, 0.05, 0.2), 50);
    setTimeout(() => this.playTone(1400, 0.05, 0.2), 100);
  }

  playMusic() {
    if (this.enabled && this.sounds.music) {
      this.sounds.music.play();
    }
  }

  stopMusic() {
    if (this.sounds.music) {
      this.sounds.music.stop();
    }
  }

  toggleAudio() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  setVolume(sound: string, volume: number) {
    if (this.sounds[sound]) {
      this.sounds[sound].volume(volume);
    }
  }
}

export const audioManager = new AudioManager();

