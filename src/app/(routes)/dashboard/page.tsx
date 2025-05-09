'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Builder from '@/app/components/Dashboard/Builder/Builder';
import Simulator from '@/app/components/Dashboard/Simulator';
import { Build } from '@/app/components/Dashboard/types';
import DashboardLayout from '@/app/layouts/DashboardLayout';

const sampleBuild: Build = {
  Name: 'Aero Pegasus 0-80 Dot (D)',
  Spin: 'R',
  Series: 'UX',
  Type: 'Attack',
  Parts: {
    Blade: 'Aero Pegasus',
    Ratchet: '0-80',
    Bit: 'Dot (D)',
  },
  Stats: {
    Attack: 83,
    Defense: 97,
    Stamina: 75,
    Burst: 30,
    Dash: 10,
    Weight: 111.4,
  },
};

const versusBuild: Build = {
  Name: 'Tyranno Fortress 10-60 Guard (G)',
  Spin: 'L',
  Series: 'UX',
  Type: 'Defense',
  Parts: {
    Blade: 'Tyranno Fortress',
    Ratchet: '10-60',
    Bit: 'Guard (G)',
  },
  Stats: {
    Attack: 55,
    Defense: 95,
    Stamina: 82,
    Burst: 40,
    Dash: 20,
    Weight: 118.6,
  },
};

const tabs = ['Builder 1', 'Builder 2', 'Simulator'];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <DashboardLayout>
      <div className="p-4 h-full w-full">
        <div className="block lg:hidden">
          <div className="flex space-x-2 mb-4">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
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
              {activeTab === 0 && <Builder build={sampleBuild} name="My Bey" />}
              {activeTab === 1 && <Builder build={versusBuild} name="Opponent" />}
              {activeTab === 2 && <Simulator build={sampleBuild} versus={versusBuild} />}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hidden lg:flex lg:flmd:flex-row gap-2 w-full h-full">
          <Builder build={sampleBuild} name="My Bey" />
          <Builder build={versusBuild} name="Opponent" />
          <Simulator build={sampleBuild} versus={versusBuild} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
