export interface Blade {
  Name: string;
  Attack: string;
  Defense: string;
  Stamina: string;
  Weight: string;
  Spin: string;
  Series: string;
  Type: string;
  Image?: string;
}

export interface Ratchet {
  Name: string;
  Attack: string;
  Defense: string;
  Stamina: string;
  Weight: string;
  Image?: string;
}

export interface Bit {
  Name: string;
  Type: string;
  Attack: string;
  Defense: string;
  Stamina: string;
  Burst: string;
  Dash: string;
  Weight: string;
  Image?: string;
}

export interface BeyDataState {
  blades: Blade[];
  ratchets: Ratchet[];
  bits: Bit[];
  fetchBeyData: () => Promise<void>;
}
