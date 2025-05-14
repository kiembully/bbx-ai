import React, { FC } from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  Cell,
  ResponsiveContainer,
  LabelList,
} from 'recharts';

interface StatData {
  stat: string;
  value: number;
  fullMark: number;
}

interface BarChartProps {
  data: StatData[];
}

const CustomBarChart: FC<BarChartProps> = ({ data }) => {
  const barColor = '#8884d8';

  const isDarkColor = (hexColor: string) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
  };

  const labelFill = isDarkColor(barColor) ? '#000' : '#fff';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderStatLabel = (props: any) => {
    const { x, y, width, value } = props;
    return (
      <text
        x={x! + width! / 2}
        y={y! - 10}
        fill={labelFill}
        fontSize={12}
        textAnchor="middle"
      >
        {value}
      </text>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderValueLabel = (props: any) => {
    const { x, y, width, value } = props;
    return (
      <text
        x={x! + width! / 2}
        y={y! - 25}
        fill={labelFill}
        fontSize={12}
        textAnchor="middle"
      >
        {value}
      </text>
    );
  };

  return (
    <div className="w-full pb-0" style={{ height: 270 }}>
      <ResponsiveContainer>
        <RechartsBarChart data={data} margin={{ top: 40, bottom: 0 }}>
          <Bar dataKey="value">
            {data.map((_, index) => (
              <Cell cursor="pointer" fill={barColor} key={`cell-${index}`} />
            ))}
            <LabelList dataKey="stat" content={renderStatLabel} />
            <LabelList dataKey="value" content={renderValueLabel} />
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
