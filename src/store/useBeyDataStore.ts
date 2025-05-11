// store/useBeyDataStore.ts
import { create } from 'zustand';
import axios from 'axios';
import { BeyDataState } from '@/model/collections';
import { useBeyBattleStore } from './useBeyBattleStore';

interface BeyDataStore extends BeyDataState {
  loading: boolean;
  fetchBeyData: () => Promise<void>;
}

export const useBeyDataStore = create<BeyDataStore>((set, get) => ({
  blades: [],
  ratchets: [],
  bits: [],
  loading: false,

  fetchBeyData: async () => {
    const { blades, ratchets, bits } = get();

    // If data already exists, skip fetch
    if (blades.length && ratchets.length && bits.length) return;

    set({ loading: true });

    try {
      const url = process.env.NEXT_PUBLIC_LOCAL_API_URL;
      const [bladesRes, ratchetsRes, bitsRes] = await Promise.all([
        axios.get(`${url}/blade/get`),
        axios.get(`${url}/ratchet/get`),
        axios.get(`${url}/bit/get`),
      ]);

      const blades = bladesRes.data;
      const ratchets = ratchetsRes.data;
      const bits = bitsRes.data;

      // Set fetched data into store
      set({
        blades,
        ratchets,
        bits,
        loading: false,
      });

      // Set default battle state using useBeyBattleStore
      const { setMyBeyPart, setOpponentBeyPart } = useBeyBattleStore.getState();

      if (blades.length >= 2 && ratchets.length >= 2 && bits.length >= 2) {
        setMyBeyPart('blade', blades[0]);
        setMyBeyPart('ratchet', ratchets[0]);
        setMyBeyPart('bit', bits[0]);

        setOpponentBeyPart('blade', blades[1]);
        setOpponentBeyPart('ratchet', ratchets[1]);
        setOpponentBeyPart('bit', bits[1]);
      }
    } catch (error) {
      console.error('Error fetching Bey data:', error);
      set({ loading: false });
    }
  },
}));
