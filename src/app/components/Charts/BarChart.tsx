import React, { FC } from 'react';
import { BarChart as RechartsBarChart, Bar, Cell, ResponsiveContainer, LabelList } from 'recharts';

interface StatData {
  stat: string;
  value: number;
  fullMark: number;
}

interface BarChartProps {
  data: StatData[];
}

// Soft color palette by stat
const statColors: Record<string, string> = {
  attack: '#f87171', // soft red
  defense: '#60a5fa', // soft blue
  stamina: '#34d399', // soft green
  burst: '#fbbf24', // soft amber
  weight: '#a78bfa', // soft purple
  agility: '#38bdf8', // soft sky
  balance: '#f472b6', // soft pink
};

const CustomBarChart: FC<BarChartProps> = ({ data }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderStatLabel = (props: any) => {
    const { x, y, width, value, index } = props;
    const statKey = data[index]?.stat.toLowerCase();
    const fill = statColors[statKey] || '#8884d8';

    return (
      <text x={x! + width! / 2} y={y! - 10} fill={fill} fontSize={12} textAnchor="middle">
        {value}
      </text>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderValueLabel = (props: any) => {
    const { x, y, width, value, index } = props;
    const statKey = data[index]?.stat.toLowerCase();
    const fill = statColors[statKey] || '#8884d8';

    return (
      <text x={x! + width! / 2} y={y! - 25} fill={fill} fontSize={12} textAnchor="middle">
        {value}
      </text>
    );
  };

  return (
    <div className="w-full pb-0" style={{ height: 270 }}>
      <ResponsiveContainer minHeight={200}>
        <RechartsBarChart data={data} margin={{ top: 40, bottom: 0 }}>
          <Bar dataKey="value">
            {data.map((entry, index) => {
              const color = statColors[entry.stat.toLowerCase()] || '#8884d8';
              return <Cell key={`cell-${index}`} fill={color} cursor="pointer" />;
            })}
            <LabelList dataKey="stat" content={renderStatLabel} />
            <LabelList dataKey="value" content={renderValueLabel} />
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
