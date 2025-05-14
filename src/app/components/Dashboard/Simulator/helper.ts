import { BeyCombo } from '@/store/useBeyBattleStore';

export const convertBuild = ({ blade, ratchet, bit }: BeyCombo) => {
  return {
    name: blade?.Name,
    spin: blade?.Spin,
    type: blade?.Type,
    attack: Number(blade?.Attack || 0) + Number(ratchet?.Attack || 0) + Number(bit?.Attack || 0),
    defense:
      Number(blade?.Defense || 0) + Number(ratchet?.Defense || 0) + Number(bit?.Defense || 0),
    stamina:
      Number(blade?.Stamina || 0) + Number(ratchet?.Stamina || 0) + Number(bit?.Stamina || 0),
    burst: Number(bit?.Burst || 0),
    weight: Number(blade?.Weight || 0) + Number(ratchet?.Weight || 0) + Number(bit?.Weight || 0),
  };
};
