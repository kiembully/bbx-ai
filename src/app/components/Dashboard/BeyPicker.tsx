'use client';
import React, { FC } from 'react';
import { IconFlareFilled, IconLabelFilled, IconWindmillFilled } from '@tabler/icons-react';
import { BeyPickerProps } from './types';

const BeyPicker: FC<BeyPickerProps> = ({ build }) => {
  return (
    <>
      <div className="flex gap-4 justify-between">
        <div className="w-full max-w-xl h-auto bg-neutral-700 rounded-lg cursor-pointer hover:scale-105 duration-150">
          <div className="flex flex-col items-center justify-center gap-2 p-4">
            <IconWindmillFilled className="h-32 w-32 text-neutral-200" />
            <span className="text-neutral-200">Pick Blade</span>
          </div>
        </div>
        <div className="w-full max-w-xl h-auto bg-neutral-700 rounded-lg cursor-pointer hover:scale-105 duration-150">
          <div className="flex flex-col items-center justify-center gap-2 p-4">
            <IconFlareFilled className="h-32 w-32 text-neutral-200" />
            <span className="text-neutral-200">Pick Ratchet</span>
          </div>
        </div>
        <div className="w-full max-w-xl h-auto bg-neutral-700 rounded-lg cursor-pointer hover:scale-105 duration-150">
          <div className="flex flex-col items-center justify-center gap-2 p-4">
            <IconLabelFilled className="h-32 w-32 text-neutral-200 rotate-90" />
            <span className="text-neutral-200">Pick Bit</span>
          </div>
        </div>
      </div>

      <div className="border-2 border-neutral-700 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-y-2">
        <div>
          Name: <span className="text-lg font-semibold text-bl">{build.Name}</span>
        </div>
        <div>
          Spin: <span className="text-lg font-semibold text-bl">{build.Spin}</span>
        </div>
        <div>
          Series: <span className="text-lg font-semibold text-bl">{build.Series}</span>
        </div>
        <div>
          Type: <span className="text-lg font-semibold text-bl">{build.Type}</span>
        </div>
      </div>
    </>
  );
};

export default BeyPicker;
