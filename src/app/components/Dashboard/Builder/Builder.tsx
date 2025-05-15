'use client';
import React, { useEffect, useState } from 'react';
import { convertBuildStatsToRadarData } from '../helper';
import CustomBarChart from '../../Charts/BarChart';
import { motion } from 'framer-motion'; // Import framer-motion
import BeyPicker from '../BeyPicker';
import { Build } from '../types';
import { IconHelpHexagon } from '@tabler/icons-react';
import { useBeyBattleStore } from '@/store/useBeyBattleStore';
import { useBeyDataStore } from '@/store/useBeyDataStore';

interface BuilderProps {
  name: string;
  build: Build;
}

const Builder: React.FC<BuilderProps> = ({ name, build }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { pickRandomParts } = useBeyBattleStore.getState();
  const { blades, ratchets, bits } = useBeyDataStore();

  useEffect(() => {
    setIsLoading(build.Name.includes('undefined'));
  }, [build]);

  return (
    <div className="p-2 w-full h-full flex flex-col gap-y-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl md:text-4xl line-clamp-1 overflow-ellipsis">🌀 {name}</h2>
        <button
          type="button"
          className="text-md font-medium flex bg-neutral-300 dark:bg-neutral-700 rounded-lg cursor-pointer hover:scale-105 duration-150 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2"
          onClick={() =>
            pickRandomParts(blades, ratchets, bits, name === 'Opponent' ? 'opponentBey' : 'myBey')
          }
        >
          <span className="mr-2">Random</span>
          <IconHelpHexagon stroke={2} />
        </button>
      </div>
      <BeyPicker build={build} name={name} picking={isLoading} />
      <div className=" border-2 border-neutral-700 rounded-lg p-4 flex flex-col gap-y-2">
        {isLoading ? (
          <div className="flex items-baseline mt-4">
            <div className="w-full bg-gray-200 h-72 dark:bg-gray-700"></div>
            <div className="w-full h-56 ms-6 bg-gray-200 dark:bg-gray-700"></div>
            <div className="w-full bg-gray-200 h-72 ms-6 dark:bg-gray-700"></div>
            <div className="w-full h-64 ms-6 bg-gray-200 dark:bg-gray-700"></div>
            <div className="w-full bg-gray-200 h-64 ms-6 dark:bg-gray-700"></div>
            <div className="w-full bg-gray-200 h-72 ms-6 dark:bg-gray-700"></div>
            <div className="w-full bg-gray-200 h-80 ms-6 dark:bg-gray-700"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <CustomBarChart data={convertBuildStatsToRadarData(build.Stats)} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Builder;
