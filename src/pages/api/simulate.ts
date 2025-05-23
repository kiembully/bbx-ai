import { BuildStats } from '@/app/components/Dashboard/Simulator/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { Bey, OutcomeDetails, Results } from './types';

const runSymmetricBattle = (
  attacker: Bey,
  defender: Bey,
  results: Results,
  details: OutcomeDetails,
  attackerKey: keyof Results & keyof OutcomeDetails,
  defenderKey: keyof Results & keyof OutcomeDetails
) => {
  const probs = calculateBaseProbabilities(attacker, defender);
  const rand = Math.random();

  if (rand < probs.ko) {
    const koRoll = (attacker.attack / defender.defense) * 0.7;
    if (Math.random() < koRoll) {
      results[attackerKey]++;
      details[attackerKey].KO++;
    } else {
      results[defenderKey]++;
      details[defenderKey].KO++;
    }
  } else if (rand < probs.ko + probs.burst) {
    const burstRoll = attacker.attack / 200 - defender.burst / 200 + 0.3;
    if (Math.random() < burstRoll) {
      results[attackerKey]++;
      details[attackerKey].BURST++;
    } else {
      results[defenderKey]++;
      details[defenderKey].BURST++;
    }
  } else {
    const totalStamina = attacker.stamina + defender.stamina;
    const staminaRoll = totalStamina > 0 ? attacker.stamina / totalStamina : 0.5;
    if (Math.random() < staminaRoll) {
      results[attackerKey]++;
      details[attackerKey].OUTSPIN++;
    } else {
      results[defenderKey]++;
      details[defenderKey].OUTSPIN++;
    }
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { bey1, bey2, iterations = 10000 } = req.body;

    // Calculate base probabilities
    const probabilities = calculateBaseProbabilities(bey1, bey2);
    const probabilities2 = calculateBaseProbabilities(bey2, bey1);
    const results = { bey1: 0, bey2: 0, draws: 0 };
    const outcomeDetails = {
      bey1: { KO: 0, BURST: 0, OUTSPIN: 0 },
      bey2: { KO: 0, BURST: 0, OUTSPIN: 0 },
    };

    for (let i = 0; i < iterations / 2; i++) {
      runSymmetricBattle(bey1, bey2, results, outcomeDetails, 'bey1', 'bey2');
      runSymmetricBattle(bey2, bey1, results, outcomeDetails, 'bey2', 'bey1');
    }

    // Calculate percentages
    const total = results.bey1 + results.bey2 + results.draws;

    res.status(200).json({
      bey1Name: bey1.name,
      bey2Name: bey2.name,
      bey1WinPercentage: ((results.bey1 / total) * 100).toFixed(1),
      bey2WinPercentage: ((results.bey2 / total) * 100).toFixed(1),
      drawPercentage: ((results.draws / total) * 100).toFixed(1),
      outcomeDetails: {
        bey1: {
          KO: results.bey1 ? (outcomeDetails.bey1.KO / results.bey1) * 100 : 0,
          BURST: results.bey1 ? (outcomeDetails.bey1.BURST / results.bey1) * 100 : 0,
          OUTSPIN: results.bey1 ? (outcomeDetails.bey1.OUTSPIN / results.bey1) * 100 : 0,
        },
        bey2: {
          KO: results.bey2 ? (outcomeDetails.bey2.KO / results.bey2) * 100 : 0,
          BURST: results.bey2 ? (outcomeDetails.bey2.BURST / results.bey2) * 100 : 0,
          OUTSPIN: results.bey2 ? (outcomeDetails.bey2.OUTSPIN / results.bey2) * 100 : 0,
        },
      },
      probabilities,
      probabilities2,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error simulating battle', error });
  }
}

function calculateBaseProbabilities(bey1: BuildStats, bey2: BuildStats) {
  const koChance = calculateKOChance(bey1, bey2);
  const burstChance = calculateBurstChance(bey1, bey2);
  const staminaChance = calculateStaminaChance(bey1, bey2);
  const total = koChance + burstChance + staminaChance;

  return {
    ko: koChance / total,
    burst: burstChance / total,
    stamina: staminaChance / total,
  };
}

function calculateKOChance(bey1: BuildStats, bey2: BuildStats) {
  const attackDefenseRatio = bey1.attack / bey2.defense;
  const weightFactor = 1 + (bey1.weight - bey2.weight) / 200;
  let typeModifier = 1;

  if (bey1.type === 'Attack' && bey2.type === 'Defense') {
    typeModifier = 0.9;
  } else if (bey1.type === 'Attack') {
    typeModifier = 1.1;
  }

  const spinModifier = bey1.spin !== bey2.spin ? 1.2 : 1;
  const baseKO = attackDefenseRatio * 0.3 * weightFactor * typeModifier * spinModifier;

  return Math.max(0, Math.min(baseKO, 0.7));
}

function calculateBurstChance(bey1: BuildStats, bey2: BuildStats) {
  const burstDiff = bey2.burst - bey1.burst;
  const attackFactor = bey1.attack / 150;
  const burstChance = 0.2 + attackFactor * 0.5 - burstDiff * 0.005;

  return Math.max(0, burstChance);
}

function calculateStaminaChance(bey1: BuildStats, bey2: BuildStats) {
  const staminaDiff = bey1.stamina - bey2.stamina;
  const weightFactor = bey1.weight / 150;
  const staminaChance = 0.3 + staminaDiff * 0.01 + weightFactor * 0.2;

  return Math.max(0, staminaChance);
}

// assymetric battle for future use
// for (let i = 0; i < iterations; i++) {
//   const random = Math.random();

//   if (random < probabilities.ko) {
//     const koRoll = (bey1.attack / bey2.defense) * 0.7;
//     if (Math.random() < koRoll) {
//       results.bey1++;
//       outcomeDetails.bey1.KO++;
//     } else {
//       results.bey2++;
//       outcomeDetails.bey2.KO++;
//     }
//   } else if (random < probabilities.ko + probabilities.burst) {
//     const burstRoll = bey1.attack / 200 - bey2.burst / 200 + 0.3;
//     if (Math.random() < burstRoll) {
//       results.bey1++;
//       outcomeDetails.bey1.BURST++;
//     } else {
//       results.bey2++;
//       outcomeDetails.bey2.BURST++;
//     }
//   } else {
//     const staminaRoll = bey1.stamina / (bey1.stamina + bey2.stamina);
//     if (Math.random() < staminaRoll) {
//       results.bey1++;
//       outcomeDetails.bey1.OUTSPIN++;
//     } else {
//       results.bey2++;
//       outcomeDetails.bey2.OUTSPIN++;
//     }
//   }
// }
