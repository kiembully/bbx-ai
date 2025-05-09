'use client';
import React from 'react';
import RadarVisualStats from '../Charts/RadarChart';
import Collapse from '../Shared/Collapsible/Collapse';
import { Build } from './types';
interface SimulatorProps {
  build: Build;
  versus: Build;
}

const Versus: React.FC<SimulatorProps> = ({ build, versus }) => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2">
        <RadarVisualStats builds={[build, versus]} />
        <div className="flex flex-col gap-y-4 justify-center">
          <div className="flex justify-between w-full">
            <span className="font-semibold">🏆 Win Rate Estimate:</span>
            <span className="text-sm">73%</span>
          </div>
          <div className="flex justify-between w-full">
            <span className="font-semibold">🧩 Build Synergy:</span>
            <span className="text-sm">92%</span>
          </div>
          <div className="flex justify-between w-full">
            <span className="font-semibold">⚔️ Best At: </span>
            <span className="text-sm">Attack</span>
          </div>
          <div className="flex justify-between w-full">
            <span className="font-semibold">🧱 Weak Against: </span>
            <span className="text-sm">Stamina</span>
          </div>
          <hr />
          <div className="flex flex-col  justify-between w-full">
            <span className="font-semibold">💡 Comment </span>
            <span className="text-sm pl-6">
              Your build excels at burst attacks but may struggle in endurance rounds.
            </span>
          </div>
        </div>
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
              title: 'AI Suggestions',
              content: <div>This one collapses by default.</div>,
            },
            {
              title: 'Notes',
              content: <div>More collapsible content here.</div>,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Simulator;
