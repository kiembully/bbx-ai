export type Bey = {
  name: string;
  type: 'Attack' | 'Defense' | 'Stamina' | string;
  attack: number;
  defense: number;
  stamina: number;
  burst: number;
  weight: number;
  spin: 'Right' | 'Left' | string;
};

export type Results = {
  bey1: number;
  bey2: number;
  draws: number;
};

export type OutcomeDetails = {
  bey1: { KO: number; BURST: number; OUTSPIN: number };
  bey2: { KO: number; BURST: number; OUTSPIN: number };
};
