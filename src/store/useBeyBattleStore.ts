// store/useBeyBattleStore.ts
import { create } from 'zustand';

export interface BeyPart {
  Name: string;
  Attack?: number;
  Defense?: number;
  Stamina?: number;
  Weight?: number;
  Spin?: string;
  Series?: string;
  Type?: string;
  Burst?: number;
  Dash?: number;
}

export interface BeyCombo {
  blade: BeyPart | null;
  ratchet: BeyPart | null;
  bit: BeyPart | null;
}

interface BeyBattleState {
  myBey: BeyCombo;
  opponentBey: BeyCombo;
  setMyBeyPart: (type: keyof BeyCombo, part: BeyPart) => void;
  setOpponentBeyPart: (type: keyof BeyCombo, part: BeyPart) => void;
  resetBattle: () => void;
}
export interface FullBeyblade {
  Name: string;
  Spin: string | 'R' | 'L'; // or string if there are other values
  Series: string;
  Type: 'Attack' | 'Defense' | 'Stamina' | string;
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

export const useBeyBattleStore = create<BeyBattleState>((set) => ({
  myBey: { blade: null, ratchet: null, bit: null },
  opponentBey: { blade: null, ratchet: null, bit: null },

  setMyBeyPart: (type, part) =>
    set((state) => ({
      myBey: { ...state.myBey, [type]: part },
    })),

  setOpponentBeyPart: (type, part) =>
    set((state) => ({
      opponentBey: { ...state.opponentBey, [type]: part },
    })),

  resetBattle: () =>
    set({
      myBey: { blade: null, ratchet: null, bit: null },
      opponentBey: { blade: null, ratchet: null, bit: null },
    }),
}));
