/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
import { BeyBattleResult, BuildStats } from './types';
import { BeyCombo, useBeyBattleStore } from '@/store/useBeyBattleStore';

const ResultsDisplay = () => {
  const { myBey, opponentBey } = useBeyBattleStore();
  const [results, setResults] = useState<BeyBattleResult>();

  const convertBuild = ({ blade, ratchet, bit }: BeyCombo) => {
    return {
      name: blade?.Name,
      spin: blade?.Spin,
      type: blade?.Type,
      attack: Number(blade?.Attack || 0) + Number(ratchet?.Attack || 0) + Number(bit?.Attack || 0),
      defense:
        Number(blade?.Defense || 0) + Number(ratchet?.Defense || 0) + Number(bit?.Defense || 0),
      stamina:
        Number(blade?.Stamina || 0) + Number(ratchet?.Stamina || 0) + Number(bit?.Stamina || 0),
      burst: Number(bit?.Burst || 0),
      weight: Number(blade?.Weight || 0) + Number(ratchet?.Weight || 0) + Number(bit?.Weight || 0),
    };
  };

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
    <div className="flex flex-col gap-4 px-4">
      <h2 className="text-xl mx-auto font-bold">⚔️ Battle Results</h2>
      <hr />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <h3 className="mb-4 text-lg font-bold">{results.bey1Name}</h3>
          <p>Win Percentage: {results.bey1WinPercentage}%</p>
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
        </div>
        {/*         
        <div className="flex flex-col gap-2">
          <h3>{results.bey2Name}</h3>
          <p>Win Percentage: {results.bey2WinPercentage}%</p>
          <ul>
            <li>KO Wins: {results.outcomeDetails.bey2.KO.toFixed(1)}%</li>
            <li>Burst Wins: {results.outcomeDetails.bey2.BURST.toFixed(1)}%</li>
            <li>Outspin Wins: {results.outcomeDetails.bey2.OUTSPIN.toFixed(1)}%</li>
          </ul>
        </div> */}
      </div>

      <hr />
      <div className="flex flex-col">
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
      </div>
    </div>
  ) : (
    <h1 className="mx-auto text-lg my-2">Loading battle results . . .</h1>
  );
};

export default ResultsDisplay;
