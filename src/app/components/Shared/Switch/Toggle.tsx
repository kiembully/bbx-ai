import React from 'react';

type CustomToggleProps = {
  leftLabel: string;
  rightLabel: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const CustomToggle: React.FC<CustomToggleProps> = ({
  leftLabel,
  rightLabel,
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-2 w-full">
      <label className="relative inline-flex items-center cursor-pointer w-full">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="w-full py-2 px-6 bg-transparent border border-2-black rounded-lg flex">
          <span className="z-20 text-black w-full flex items-center justify-center text-lg font-bold">
            {leftLabel}
          </span>
          <span className="z-20 text-black w-full flex items-center justify-center text-lg font-bold">
            {rightLabel}
          </span>
        </div>
        <div className="z-10 absolute left-1 top-1 w-1/2 h-4/5 bg-neutral-300 rounded-sm shadow transform peer-checked:translate-x-[95%] transition-all"></div>
      </label>
    </div>
  );
};

export default CustomToggle;
