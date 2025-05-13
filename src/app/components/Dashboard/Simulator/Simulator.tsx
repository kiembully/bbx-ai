'use client';
import React, { useEffect, useState } from 'react';
import RadarVisualStats from '../../Charts/RadarChart';
import Collapse from '../../Shared/Collapsible/Collapse';
import { Build } from '../types';
import ResultsDisplay from './ResultDisplay';
import BattleGuide from './BattleGuide';
interface SimulatorProps {
  build: Build;
  versus: Build;
}

const Versus: React.FC<SimulatorProps> = ({ build, versus }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(build.Name.includes('undefined'));
  }, [build]);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2 max-h-[60vh] overflow-x-hidden overflow-y-auto">
        <RadarVisualStats builds={[build, versus]} isLoading={isLoading} />
        <div className="flex flex-col gap-2 mb-2 items-center">
          <div className="text-md font-semibold text-[#ff7875]">{build.Name}</div>
          <div className="text-md font-semibold text-[#82ca9d]">{versus.Name}</div>
        </div>
        <hr className="mx-4" />
        <ResultsDisplay />
      </div>
    </div>
  );
};

const Simulator: React.FC<SimulatorProps> = ({ build, versus }) => {
  return (
    <div className="w-full flex flex-col gap-y-4">
      <h2 className="text-2xl md:text-4xl mb-4">🤖 Simulator</h2>
      <div className="p-2 bg-neutral-900 rounded-lg">
        <Collapse
          items={[
            {
              title: 'Versus ⚔️',
              content: <Versus build={build} versus={versus} />,
            },
            {
              title: 'AI Suggestions 🤖',
              content: <h1>Soon . . .</h1>,
            },
            {
              title: 'Battle Guide 📝',
              content: <BattleGuide />,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Simulator;
