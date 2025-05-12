import React from 'react';
import { HoverEffect } from '../../ui/card-hover-effect';
import { Blade, Ratchet, Bit } from '@/model/collections';
import { Build } from '../../Dashboard/types';

interface CardHoverProps {
  data: Blade[] | Ratchet[] | Bit[];
  loading?: boolean;
  variant?: 'default' | 'selectable';
  onSelect?: (item: { Name: string }) => void;
  build?: Build;
  type?: string;
}

export const CardHover: React.FC<CardHoverProps> = ({
  data,
  loading,
  variant,
  onSelect,
  build,
}) => {
  const handleClick = (item: { Name: string }) => {
    onSelect?.(item);
  };

  return (
    <div className="mx-auto px-8">
      <HoverEffect
        loading={loading}
        items={data}
        variant={variant}
        onSelect={(item) => handleClick(item)}
        build={build}
      />
    </div>
  );
};
