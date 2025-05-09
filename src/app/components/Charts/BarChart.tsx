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

const CustomBarChart: FC<BarChartProps> = ({ data }) => {
  return (
    <div className="w-full pb-0" style={{ height: 270 }}>
      <ResponsiveContainer>
        <RechartsBarChart data={data} margin={{ top: 40, bottom: 0 }}>
          <Bar dataKey="value">
            {data.map((entry, index) => (
              <Cell cursor="pointer" fill={'#8884d8'} key={`cell-${index}`} />
            ))}
            {/* Adding label and value to each bar */}
            <LabelList dataKey="stat" position="top" fill="#fff" fontSize={12} offset={10} />
            <LabelList dataKey="value" position="top" fill="#fff" fontSize={12} offset={25} />
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
