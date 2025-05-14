'use client';
import { useBeyBattleStore } from '@/store/useBeyBattleStore';
import { useState } from 'react';
import { convertBuild } from './helper';
import { BuildStats } from './types';

const Insights = () => {
  const { myBey, opponentBey } = useBeyBattleStore();
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalysis = async (bey1: BuildStats, bey2: BuildStats) => {
    if (!bey1 || !bey2) {
      setAnalysis('Both Beys must be selected before analysis.');
      return;
    }

    setLoading(true);
    setAnalysis('');

    const userMessage = `
    My Bey: ${bey1.name}, Type: ${bey1.type}, Spin: ${bey1.spin}, 
    Attack: ${bey1.attack}, Defense: ${bey1.defense}, Stamina: ${bey1.stamina}, 
    Burst: ${bey1.burst}, Weight: ${bey1.weight}

    Opponent Bey: ${bey2.name}, Type: ${bey2.type}, Spin: ${bey2.spin}, 
    Attack: ${bey2.attack}, Defense: ${bey2.defense}, Stamina: ${bey2.stamina}, 
    Burst: ${bey2.burst}, Weight: ${bey2.weight}

    Please analyze the matchup and suggest strategy or adjustments to win.
    `.trim();

    try {
      const res = await fetch('/api/bey-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!res.body) throw new Error('No response stream.');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunk = decoder.decode(value, { stream: true });

        chunk.split('\n').forEach((line) => {
          line = line.trim();
          if (!line) return;

          try {
            const json = JSON.parse(line);
            const content = json.message?.content || '';
            setAnalysis((prev) => prev + content);
          } catch (error) {
            console.log('[JSON Parse Error]', error, 'Line:', line);
          }
        });
      }
    } catch (err) {
      setAnalysis(err instanceof Error ? err.message : 'Stream error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto p-4 bg-white shadow-md rounded-lg max-h-[570px] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-3 text-gray-800">🧠 Matchup Insights</h2>

      {loading ? (
        <div className="text-gray-500 italic flex">
          Analyzing battle, please wait.
          <div className="justify-items-start items-center text-right m-2 w-min">
            <div className="flex flex-row gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-.3s]"></div>
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-.5s]"></div>
            </div>
          </div>
        </div>
      ) : (
        <pre className="whitespace-pre-wrap text-gray-800 text-sm">
          {analysis ? analysis : 'Unable to process, please try again later.'}
        </pre>
      )}

      <button
        disabled={loading}
        onClick={() => handleAnalysis(convertBuild(myBey), convertBuild(opponentBey))}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Analyzing...' : 'Get Insights'}
      </button>
    </div>
  );
};

export default Insights;
