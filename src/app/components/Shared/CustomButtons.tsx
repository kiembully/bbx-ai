import { cn } from '@/app/lib/utils';
import React, { MouseEventHandler, ReactNode } from 'react';

interface CustomButtonsProps {
  type: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  submit?: boolean;
}

const CustomButtons: React.FC<CustomButtonsProps> = ({
  type,
  children,
  onClick,
  disabled,
  submit,
}) => {
  const buttonType = [
    {
      name: 'shimmer',
      class:
        'inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 md:font-medium text-slate-400 text-sm md:text-md transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50',
    },
    {
      name: 'invert',
      class:
        'p-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500',
    },
  ];

  const selectedButtonType = buttonType.find((button) => button.name === type);

  return (
    <button
      type={submit ? 'submit' : 'button'}
      onClick={onClick}
      className={cn('disabled:opacity-20', selectedButtonType?.class)}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default CustomButtons;
