'use client';
import React from 'react';
import { convertBuildStatsToRadarData } from '../helper';
import CustomBarChart from '../../Charts/BarChart';
import { motion } from 'framer-motion'; // Import framer-motion
import BeyPicker from '../BeyPicker';
import { Build } from '../types';

const sampleBuild: Build = {
  Name: 'Aero Pegasus 0-80 Dot (D)',
  Spin: 'R', // Correctly typed as "R" | "L"
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

const Builder = () => {
  return (
    <div className="p-2 w-full h-full flex flex-col gap-y-4">
      <h2 className="text-2xl md:text-4xl mb-4">⚒️ Builder</h2>
      <BeyPicker build={sampleBuild} />
      <div className=" border-2 border-neutral-700 rounded-lg p-4 flex flex-col gap-y-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          <CustomBarChart data={convertBuildStatsToRadarData(sampleBuild.Stats)} />
          {/* <RadarVisualStats data={convertBuildStatsToRadarData(sampleBuild.Stats)} /> */}
        </motion.div>
      </div>
    </div>
  );
};

export default Builder;
