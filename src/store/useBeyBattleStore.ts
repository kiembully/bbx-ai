// store/useBeyBattleStore.ts
import { Bit, Blade, Ratchet } from '@/model/collections';
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
  Image?: string;
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
  pickRandomParts: (
    blades: Blade[],
    ratchets: Ratchet[],
    bits: Bit[],
    target: 'myBey' | 'opponentBey'
  ) => void;
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
  Images: {
    Blade?: string;
    Ratchet?: string;
    Bit?: string;
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

  pickRandomParts: (blades, ratchets, bits, target) => {
    const random = (arr: Bit[] | Blade[] | Ratchet[]) =>
      arr.length ? arr[Math.floor(Math.random() * arr.length)] : null;
    const combo = {
      blade: random(blades),
      ratchet: random(ratchets),
      bit: random(bits),
    };

    console.log(combo);

    set((state) => ({
      ...state,
      [target]: combo,
    }));
  },
}));
