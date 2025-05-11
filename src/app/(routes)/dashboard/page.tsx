'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Builder from '@/app/components/Dashboard/Builder/Builder';
import Simulator from '@/app/components/Dashboard/Simulator';
import DashboardLayout from '@/app/layouts/DashboardLayout';
import { useBeyDataStore } from '@/store/useBeyDataStore';
import { useBeyBattleStore } from '@/store/useBeyBattleStore';

const tabs = ['Builder 1', 'Builder 2', 'Simulator'];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { fetchBeyData } = useBeyDataStore();
  const { myBey, opponentBey } = useBeyBattleStore();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const convertCombo = ({ blade, ratchet, bit }: any) => {
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
        Attack:
          Number(blade?.Attack || 0) + Number(ratchet?.Attack || 0) + Number(bit?.Attack || 0),
        Defense:
          Number(blade?.Defense || 0) + Number(ratchet?.Defense || 0) + Number(bit?.Defense || 0),
        Stamina:
          Number(blade?.Stamina || 0) + Number(ratchet?.Stamina || 0) + Number(bit?.Stamina || 0),
        Burst: Number(bit?.Burst || 0),
        Dash: Number(bit?.Dash || 0),
        Weight:
          Number(blade?.Weight || 0) + Number(ratchet?.Weight || 0) + Number(bit?.Weight || 0),
      },
    };
  };

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
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {activeTab === 0 && <Builder build={convertCombo(myBey)} name="My Bey" />}
              {activeTab === 1 && <Builder build={convertCombo(opponentBey)} name="Opponent" />}
              {activeTab === 2 && (
                <Simulator build={convertCombo(myBey)} versus={convertCombo(opponentBey)} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hidden lg:flex lg:flmd:flex-row gap-2 w-full h-full">
          <Builder build={convertCombo(myBey)} name="My Bey" />
          <Builder build={convertCombo(opponentBey)} name="Opponent" />
          <Simulator build={convertCombo(myBey)} versus={convertCombo(opponentBey)} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
