export interface BattleOutcomeDetails {
  KO: number;
  BURST: number;
  OUTSPIN: number;
}

export interface BattleProbabilities {
  ko: number;
  burst: number;
  stamina: number;
}

export interface BeyBattleResult {
  bey1Name: string;
  bey2Name: string;
  bey1WinPercentage: string; // optionally: number if you want to treat as numeric
  bey2WinPercentage: string;
  drawPercentage: string;
  outcomeDetails: {
    bey1: BattleOutcomeDetails;
    bey2: BattleOutcomeDetails;
  };
  probabilities: BattleProbabilities;
  probabilities2: BattleProbabilities;
}

export interface BuildStats {
  name: string | undefined;
  spin: string | undefined;
  type: string | undefined;
  attack: number;
  defense: number;
  stamina: number;
  burst: number;
  weight: number;
}
