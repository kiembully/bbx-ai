'use client';
import { useEffect, useMemo, useState } from 'react';
import Builder from '@/app/components/Dashboard/Builder/Builder';
import DashboardLayout from '@/app/layouts/DashboardLayout';
import { useBeyDataStore } from '@/store/useBeyDataStore';
import { BeyCombo, FullBeyblade, useBeyBattleStore } from '@/store/useBeyBattleStore';
import Simulator from '@/app/components/Dashboard/Simulator/Simulator';

const convertCombo = ({ blade, ratchet, bit }: BeyCombo): FullBeyblade => {
  return {
    Name: `${blade?.Name} / ${ratchet?.Name} / ${bit?.Name}`,
    Spin: blade?.Spin || '',
    Series: blade?.Series || '',
    Type: blade?.Type || '',
    Parts: {
      Blade: blade?.Name || '',
      Ratchet: ratchet?.Name || '',
      Bit: bit?.Name || '',
    },
    Stats: {
      Attack: Number(blade?.Attack || 0) + Number(ratchet?.Attack || 0) + Number(bit?.Attack || 0),
      Defense:
        Number(blade?.Defense || 0) + Number(ratchet?.Defense || 0) + Number(bit?.Defense || 0),
      Stamina:
        Number(blade?.Stamina || 0) + Number(ratchet?.Stamina || 0) + Number(bit?.Stamina || 0),
      Burst: Number(bit?.Burst || 0),
      Dash: Number(bit?.Dash || 0),
      Weight: Number(blade?.Weight || 0) + Number(ratchet?.Weight || 0) + Number(bit?.Weight || 0),
    },
    Images: {
      Blade: blade?.Image,
      Ratchet: ratchet?.Image,
      Bit: bit?.Image,
    },
  };
};

const tabs = ['Builder 1', 'Builder 2', 'Simulator'];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { fetchBeyData } = useBeyDataStore();
  const { myBey, opponentBey } = useBeyBattleStore();
  const myBuild = useMemo(() => convertCombo(myBey), [myBey]);
  const opponentBuild = useMemo(() => convertCombo(opponentBey), [opponentBey]);

  useEffect(() => {
    fetchBeyData();
  }, [fetchBeyData]);

  return (
    <DashboardLayout>
      <div className="p-4 h-full w-full">
        <div className="block lg:hidden">
          <div className="flex space-x-2 mb-4">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 w-full ${
                  i === activeTab ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-full h-full">
            <div className={`${activeTab === 0 ? 'block' : 'hidden'}`}>
              <Builder build={myBuild} name="My Bey" />
            </div>
            <div className={`${activeTab === 1 ? 'block' : 'hidden'}`}>
              <Builder build={opponentBuild} name="Opponent" />
            </div>
            <div className={`${activeTab === 2 ? 'block' : 'hidden'}`}>
              <Simulator build={myBuild} versus={opponentBuild} />
            </div>
          </div>
        </div>

        <div className="hidden lg:flex lg:flmd:flex-row gap-2 w-full h-full dark:text-white text-black">
          <Builder build={myBuild} name="My Bey" />
          <Builder build={opponentBuild} name="Opponent" />
          <Simulator build={myBuild} versus={opponentBuild} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
