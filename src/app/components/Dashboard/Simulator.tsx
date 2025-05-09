'use client';
import RadarVisualStats from '../Charts/RadarChart';
import Collapse from '../Shared/Collapsible/Collapse';
import BeyPicker from './BeyPicker';
import { Build } from './types';

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

const Versus = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <BeyPicker build={versusBuild} />
      <div className="border-2 border-neutral-700 rounded-lg p-4 flex flex-col-reverse md:flex-row gap-y-2">
        <div className="flex flex-col gap-y-4 w-1/2 justify-center">
          <div className="flex flex-col">
            <span className="font-semibold">⚔️ Attack Advantage: </span>
            <span className="text-sm">+20 over opponent</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">🛡️ Defense Clash: </span>
            <span className="text-sm">Close match, difference: 4%</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">🌀 Stamina Edge: </span>
            <span className="text-sm">1.25× longer spin time (est.)</span>
          </div>
        </div>
        <RadarVisualStats
          builds={[
            {
              Name: 'Aero Pegasus',
              Stats: {
                Attack: 83,
                Defense: 97,
                Stamina: 75,
                Burst: 30,
                Dash: 10,
                Weight: 111.4,
              },
            },
            {
              Name: 'Tyranno Fang',
              Stats: {
                Attack: 92,
                Defense: 80,
                Stamina: 60,
                Burst: 40,
                Dash: 20,
                Weight: 108.2,
              },
            },
          ]}
        />
      </div>
    </div>
  );
};

const Simulator = () => {
  return (
    <div className="p-2 w-full flex flex-col gap-y-4">
      <h2 className="text-2xl md:text-4xl mb-4">🤖 Simulator</h2>
      <div className="p-6 bg-neutral-900 rounded-lg">
        <Collapse
          items={[
            {
              title: 'Versus ⚔️',
              content: <Versus />,
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
