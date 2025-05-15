/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
import { BeyBattleResult, BuildStats } from './types';
import { useBeyBattleStore } from '@/store/useBeyBattleStore';
import { convertBuild } from './helper';
import CustomToggle from '../../Shared/Switch/Toggle';

const ResultsDisplay = () => {
  const { myBey, opponentBey } = useBeyBattleStore();
  const [results, setResults] = useState<BeyBattleResult>();
  const [isChecked, setIsChecked] = useState(false);

  const handleSimulate = async (bey1: BuildStats, bey2: BuildStats) => {
    try {
      const response = await fetch('/api/simulate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bey1, bey2, iterations: 10000 }),
      });

      if (!response.ok) {
        throw new Error('Failed to simulate battle');
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to simulate battle');
    }
  };

  useEffect(() => {
    handleSimulate(convertBuild(myBey), convertBuild(opponentBey));
  }, [myBey, opponentBey]);

  return results ? (
    <div className="flex flex-col gap-4 px-4 text-neutral-800">
      <h2 className="text-xl mx-auto font-bold">⚔️ Battle Results</h2>
      <hr />
      <div className="flex flex-col gap-4">
        <CustomToggle
          leftLabel={results.bey1Name}
          rightLabel={results.bey2Name}
          checked={isChecked}
          onChange={(val) => setIsChecked(val)}
        />
        <div className="flex flex-col">
          {!isChecked ? (
            <>
              <p className="flex justify-between w-full">
                <span>Win Percentage:</span> {results.bey1WinPercentage}%
              </p>
              <div className="flex flex-col">
                <div className="flex justify-between w-full">
                  <span>KO Wins:</span> {results.outcomeDetails.bey1.KO.toFixed(1)}%
                </div>
                <div className="flex justify-between w-full">
                  <span>Burst Wins:</span> {results.outcomeDetails.bey1.BURST.toFixed(1)}%
                </div>
                <div className="flex justify-between w-full">
                  <span>Outspin Wins:</span> {results.outcomeDetails.bey1.OUTSPIN.toFixed(1)}%
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="flex justify-between w-full">
                <span>Win Percentage:</span> {results.bey2WinPercentage}%
              </p>
              <div className="flex flex-col">
                <div className="flex justify-between w-full">
                  <span>KO Wins:</span> {results.outcomeDetails.bey2.KO.toFixed(1)}%
                </div>
                <div className="flex justify-between w-full">
                  <span>Burst Wins:</span> {results.outcomeDetails.bey2.BURST.toFixed(1)}%
                </div>
                <div className="flex justify-between w-full">
                  <span>Outspin Wins:</span> {results.outcomeDetails.bey2.OUTSPIN.toFixed(1)}%
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <hr />
      <div className="flex flex-col">
        {!isChecked ? (
          <>
            <h3 className="mb-4 text-lg font-bold">Battle Outcome Probabilities</h3>
            <p className="flex justify-between">
              <span>KO Chance:</span> {(results.probabilities.ko * 100).toFixed(1)}%
            </p>
            <p className="flex justify-between">
              <span>Burst Chance:</span> {(results.probabilities.burst * 100).toFixed(1)}%
            </p>
            <p className="flex justify-between">
              <span>Stamina Chance:</span> {(results.probabilities.stamina * 100).toFixed(1)}%
            </p>
          </>
        ) : (
          <>
            <h3 className="mb-4 text-lg font-bold">Battle Outcome Probabilities</h3>
            <p className="flex justify-between">
              <span>KO Chance:</span> {(results.probabilities2.ko * 100).toFixed(1)}%
            </p>
            <p className="flex justify-between">
              <span>Burst Chance:</span> {(results.probabilities2.burst * 100).toFixed(1)}%
            </p>
            <p className="flex justify-between">
              <span>Stamina Chance:</span> {(results.probabilities2.stamina * 100).toFixed(1)}%
            </p>
          </>
        )}
      </div>
    </div>
  ) : (
    <h1 className="mx-auto text-lg my-2">Loading battle results . . .</h1>
  );
};

export default ResultsDisplay;
