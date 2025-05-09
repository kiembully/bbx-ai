'use client';
import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface Build {
  Name: string;
  Stats: Record<string, number>;
}

interface RadarVisualStatsProps {
  builds: Build[];
}

// Mapping of full stat names to abbreviations
const statAbbreviations: Record<string, string> = {
  Attack: 'Atk',
  Defense: 'Def',
  Stamina: 'Sta',
  Burst: 'Bst',
  Dash: 'Dsh',
};

const RadarVisualStats = ({ builds }: RadarVisualStatsProps) => {
  const statKeys = Object.keys(builds[0]?.Stats || {}).filter(
    (key) => key.toLowerCase() !== 'weight'
  );

  const radarData = statKeys.map((stat) => {
    const entry: Record<string, string | number> = {
      stat: statAbbreviations[stat] || stat,
    };
    builds.forEach((build, i) => {
      entry[`build${i}`] = build.Stats[stat];
    });
    entry.fullMark = 150;
    return entry;
  });

  const colors = ['#ff7875', '#82ca9d', '#8884d8', '#ffc658'];

  return (
    <div className="mb-10" style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <RadarChart outerRadius="110%" data={radarData} margin={{ top: 60 }}>
          <PolarGrid />
          <PolarAngleAxis dataKey="stat" />
          <PolarRadiusAxis angle={18} domain={[0, 150]} fontSize={10} />
          {builds.map((build, i) => (
            <Radar
              key={build.Name}
              name={build.Name}
              dataKey={`build${i}`}
              stroke={colors[i % colors.length]}
              fill={colors[i % colors.length]}
              fillOpacity={0.4}
            />
          ))}
          <Legend fontSize={10} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarVisualStats;
RadarVisualStats;
