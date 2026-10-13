// Sound system disabled per architecture specification
class SoundEngine {
  public isEnabled(): boolean {
    return false;
  }
  public setEnabled(_val: boolean): void {}
  public playClick(): void {}
  public playBlip(): void {}
  public playSuccess(): void {}
}

export const soundEngine = new SoundEngine();
