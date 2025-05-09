import React from 'react';
import { HoverEffect } from '../../ui/card-hover-effect';

interface CardHoverProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  loading?: boolean;
}

export const CardHover: React.FC<CardHoverProps> = ({ data, loading }) => {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect loading={loading} items={data} />
    </div>
  );
};
