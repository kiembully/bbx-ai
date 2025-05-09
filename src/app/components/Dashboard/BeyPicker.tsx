'use client';
import React, { FC, useState } from 'react';
import { IconFlareFilled, IconLabelFilled, IconWindmillFilled } from '@tabler/icons-react';
import { BeyPickerProps } from './types';
import Modal from '../Shared/Modal/Modal';
import { CardHover } from '../Shared/Cards/Cards';
import { PlaceholdersAndVanishInput } from '../ui/placeholder-and-vanish-inputs';
import axios from 'axios';

const BeyPicker: FC<BeyPickerProps> = ({ build, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalLabel, setModalLabel] = useState('');
  const [modalType, setModalType] = useState('');
  const [loading, setLoading] = useState(false);
  const [parts, setParts] = useState<unknown[]>([]);

  const fetchParts = async (type: string) => {
    setLoading(true);
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const url = `${baseUrl}/api/${type.toLowerCase()}`;
    try {
      const response = await axios.get(url);
      setParts(response.data.rows);
      setLoading(false);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
      setLoading(false);
      return [];
    }
  };

  const handleOpenDialog = async ({
    label,
    type,
    isOpen,
  }: {
    label: string;
    type: string;
    isOpen: boolean;
  }) => {
    setIsOpen(isOpen);
    setModalLabel(label);
    setModalType(type);
    await fetchParts(type);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const placeholders = [`Search for ${modalType}'s name . . .`];

  return (
    name && (
      <>
        <div className={`flex gap-4 justify-between flex-col w-full`}>
          <div
            onClick={() => handleOpenDialog({ label: name, type: 'Blades', isOpen: true })}
            className="w-full h-auto bg-neutral-700 rounded-lg cursor-pointer hover:scale-105 duration-150"
          >
            <div className={`flex items-center gap-2 p-4 flex-row`}>
              <IconWindmillFilled className={`text-neutral-200 h-10 w-10`} />
              <span className="text-neutral-200">Pick Blade</span>
            </div>
          </div>
          <div
            onClick={() => handleOpenDialog({ label: name, type: 'Ratchet', isOpen: true })}
            className="w-full h-auto bg-neutral-700 rounded-lg cursor-pointer hover:scale-105 duration-150"
          >
            <div className={`flex items-center gap-2 p-4 flex-row`}>
              <IconFlareFilled className={`text-neutral-200 h-10 w-10`} />
              <span className="text-neutral-200">Pick Ratchet</span>
            </div>
          </div>
          <div
            onClick={() => handleOpenDialog({ label: name, type: 'Bits', isOpen: true })}
            className="w-full h-auto bg-neutral-700 rounded-lg cursor-pointer hover:scale-105 duration-150"
          >
            <div className={`flex items-center gap-2 p-4 flex-row`}>
              <IconLabelFilled className={`text-neutral-200 h-10 w-10 rotate-90`} />
              <span className="text-neutral-200">Pick Bit</span>
            </div>
          </div>
        </div>

        <div className="border-2 border-neutral-700 rounded-lg p-4 grid grid-cols-1 gap-y-2">
          <div className="line-clamp-1 overflow-ellipsis">
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

        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-2 text-center">
              {modalLabel === 'Opponent'
                ? `Pick Opponent's ${modalType}`
                : `Pick Your ${modalType}`}
            </h2>
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
            />
            <div className="h-[400px] md:h-[600px] overflow-y-auto">
              <CardHover data={parts} loading={loading} />
            </div>
          </div>
        </Modal>
      </>
    )
  );
};

export default BeyPicker;
