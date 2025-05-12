export interface Build {
  Name: string;
  Spin: 'R' | 'L'; // Assuming only Right or Left spin
  Series: string;
  Type: 'Attack' | 'Defense' | 'Stamina' | string; // Extendable
  Parts: {
    Blade: string;
    Ratchet: string;
    Bit: string;
  };
  Stats: {
    Attack: number;
    Defense: number;
    Stamina: number;
    Burst: number;
    Dash: number;
    Weight: number;
  };
}

export interface BeyPickerProps {
  build: Build;
  picking: boolean;
  name?: string;
}
