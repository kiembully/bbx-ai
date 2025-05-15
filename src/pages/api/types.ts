
type Bey = {
  name: string;
  type: 'Attack' | 'Defense' | 'Stamina' | string;
  attack: number;
  defense: number;
  stamina: number;
  burst: number;
  weight: number;
  spin: 'Right' | 'Left' | string;
};

type Results = {
  bey1: number;
  bey2: number;
  draws: number;
};

type OutcomeDetails = {
  bey1: { KO: number; BURST: number; OUTSPIN: number };
  bey2: { KO: number; BURST: number; OUTSPIN: number };
};

export interface RunSymmetricBattleProps {
  data: {
    attacker: Bey,
    defender: Bey,
    results: Results,
    details: OutcomeDetails,
    attackerKey: keyof Results & keyof OutcomeDetails,
    defenderKey: keyof Results & keyof OutcomeDetails
  }
}
