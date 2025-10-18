import { Howl } from 'howler';

class AudioManager {
  private sounds: Record<string, Howl> = {};
  private enabled: boolean = true;

  constructor() {
    this.initializeSounds();
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
  }

  playWindowOpen() {
    if (this.enabled && this.sounds.windowOpen) {
      this.sounds.windowOpen.play();
    }
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

