'use client';
import React from 'react';
import { convertBuildStatsToRadarData } from '../helper';
import CustomBarChart from '../../Charts/BarChart';
import { motion } from 'framer-motion'; // Import framer-motion
import BeyPicker from '../BeyPicker';
import { Build } from '../types';

interface BuilderProps {
  name: string;
  build: Build;
}

const Builder: React.FC<BuilderProps> = ({ name, build }) => {
  return (
    <div className="p-2 w-full h-full flex flex-col gap-y-4">
      <h2 className="text-2xl md:text-4xl mb-4 line-clamp-1 overflow-ellipsis">🌀 {name}</h2>
      <BeyPicker build={build} name={name} />
      <div className=" border-2 border-neutral-700 rounded-lg p-4 flex flex-col gap-y-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          <CustomBarChart data={convertBuildStatsToRadarData(build.Stats)} />
        </motion.div>
      </div>
    </div>
  );
};

export default Builder;
