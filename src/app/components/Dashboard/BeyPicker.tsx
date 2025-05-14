'use client';
import React, { FC, useEffect, useState } from 'react';
import { IconFlareFilled, IconLabelFilled, IconWindmillFilled } from '@tabler/icons-react';
import { BeyPickerProps } from './types';
import Modal from '../Shared/Modal/Modal';
import { CardHover } from '../Shared/Cards/Cards';
import { PlaceholdersAndVanishInput } from '../ui/placeholder-and-vanish-inputs';
import { useBeyDataStore } from '@/store/useBeyDataStore';
import { Bit, Blade, Ratchet } from '@/model/collections';
import { BeyPart, useBeyBattleStore } from '@/store/useBeyBattleStore';
import { IconX } from '@tabler/icons-react';

const BeyPicker: FC<BeyPickerProps> = ({ build, name, picking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalLabel, setModalLabel] = useState('');
  const [modalType, setModalType] = useState('');
  const [parts, setParts] = useState<Blade[] | Ratchet[] | Bit[]>([]);
  const [filteredParts, setFilteredParts] = useState<Blade[] | Ratchet[] | Bit[]>(parts);
  const [fiterValue, setFilterValue] = useState<string>('');
  const { blades, ratchets, bits, loading } = useBeyDataStore();

  useEffect(() => {
    if (modalType === 'Blades') {
      setParts(blades);
    } else if (modalType === 'Ratchet') {
      setParts(ratchets);
    } else if (modalType === 'Bits') {
      setParts(bits);
    }
  }, [modalType, blades, ratchets, bits]);

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
    // await fetchParts(type);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setFilterValue(e.target.value);
    // Get all available parts based on modalType
    let allParts: Blade[] | Ratchet[] | Bit[] = [];
    if (modalType === 'Blades') {
      allParts = blades;
    } else if (modalType === 'Ratchet') {
      allParts = ratchets;
    } else if (modalType === 'Bits') {
      allParts = bits;
    }

    // Filter logic: check if any string field contains the query
    const filtered = allParts.filter((part) =>
      Object.values(part).some(
        (val) => typeof val === 'string' && val.toLowerCase().includes(query)
      )
    );

    setFilteredParts(filtered);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFilterValue('');
    setFilteredParts(parts);
  };

  const placeholders = [`Search for ${modalType}'${modalType !== 'Blades' ? 's' : ''} name . . .`];

  const handlePartSelect = (
    partType: 'blade' | 'ratchet' | 'bit',
    part: BeyPart,
    side: 'my' | 'opponent'
  ) => {
    const setPart =
      side === 'my'
        ? useBeyBattleStore.getState().setMyBeyPart
        : useBeyBattleStore.getState().setOpponentBeyPart;

    const combo =
      side === 'my' ? useBeyBattleStore.getState().myBey : useBeyBattleStore.getState().opponentBey;

    // Set the selected part
    setPart(partType, part);

    // Check if all parts are now selected
    const updatedCombo = { ...combo, [partType]: part };
    const isComplete = updatedCombo.blade && updatedCombo.ratchet && updatedCombo.bit;

    if (isComplete) {
      console.log(`✅ ${side === 'my' ? 'My BeyBlade' : 'Opponent'} is ready:`, updatedCombo);
      // Optionally trigger animation, save, or compare now
    } else {
      console.log(`❌ ${side === 'my' ? 'My BeyBlade' : 'Opponent'} is not ready yet.`);
    }
  };

  const handleSelectCard = (item: { Name: string }) => {
    let newParts = '';
    if (modalType === 'Blades') {
      newParts = 'blade';
    }
    if (modalType === 'Ratchet') {
      newParts = 'ratchet';
    }
    if (modalType === 'Bits') {
      newParts = 'bit';
    }

    handlePartSelect(
      newParts as 'blade' | 'ratchet' | 'bit',
      item,
      name === 'Opponent' ? 'opponent' : 'my'
    );
    setIsOpen(false);
    setFilterValue('');
    setFilteredParts(parts);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    setFilteredParts(parts);
  }, [parts]);

  return (
    name && (
      <>
        <div className={`flex gap-4 justify-between flex-col w-full`}>
          <button
            type="button"
            disabled={picking}
            onClick={() => handleOpenDialog({ label: name, type: 'Blades', isOpen: true })}
            className="w-full h-auto bg-neutral-700 rounded-lg cursor-pointer hover:scale-105 duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className={`flex items-center gap-2 p-4 flex-row`}>
              <IconWindmillFilled className={`text-neutral-200 h-10 w-10`} />
              <span className="text-neutral-200">{build && build.Parts.Blade}</span>
            </div>
          </button>
          <button
            type="button"
            disabled={picking}
            onClick={() => handleOpenDialog({ label: name, type: 'Ratchet', isOpen: true })}
            className="w-full h-auto bg-neutral-700 rounded-lg cursor-pointer hover:scale-105 duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className={`flex items-center gap-2 p-4 flex-row`}>
              <IconFlareFilled className={`text-neutral-200 h-10 w-10`} />
              <span className="text-neutral-200">{build && build.Parts.Ratchet}</span>
            </div>
          </button>
          <button
            type="button"
            disabled={picking}
            onClick={() => handleOpenDialog({ label: name, type: 'Bits', isOpen: true })}
            className="w-full h-auto bg-neutral-700 rounded-lg cursor-pointer hover:scale-105 duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className={`flex items-center gap-2 p-4 flex-row`}>
              <IconLabelFilled className={`text-neutral-200 h-10 w-10 rotate-90`} />
              <span className="text-neutral-200">{build ? build.Parts.Bit : 'Pick a Bit'}</span>
            </div>
          </button>
        </div>

        <div className="border-2 border-neutral-700 rounded-lg p-4 grid grid-cols-1 gap-y-2">
          <div className="flex items-center gap-2">
            Name:
            {!picking ? (
              <span className="line-clamp-1 overflow-ellipsis text-lg font-semibold text-bl">
                {build.Name}
              </span>
            ) : (
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2" />
            )}
          </div>
          <div className="flex items-center gap-2">
            Spin:
            {!picking ? (
              <span className="line-clamp-1 overflow-ellipsis text-lg font-semibold text-bl">
                {build.Spin}
              </span>
            ) : (
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2" />
            )}
          </div>
          <div className="flex items-center gap-2">
            Series:
            {!picking ? (
              <span className="line-clamp-1 overflow-ellipsis text-lg font-semibold text-bl">
                {build.Series}
              </span>
            ) : (
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2" />
            )}
          </div>
          <div className="flex items-center gap-2">
            Type:
            {!picking ? (
              <span className="line-clamp-1 overflow-ellipsis text-lg font-semibold text-bl">
                {build.Type}
              </span>
            ) : (
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2" />
            )}
          </div>
        </div>

        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} fullView={true}>
          <div className="flex flex-col h-full relative p-4">
            <h2 className="mt-10 text-xl font-semibold mb-2 text-center">
              {modalLabel === 'Opponent'
                ? `Pick Opponent's ${modalType}`
                : `Pick Your ${modalType}`}
            </h2>
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              newValue={fiterValue}
              onSubmit={onSubmit}
            />
            <div className="flex-1 overflow-y-auto my-10">
              <CardHover
                data={filteredParts}
                loading={loading}
                variant="selectable"
                onSelect={handleSelectCard}
                build={build}
                type={modalType}
              />
            </div>
            <button
              type="button"
              className="p-2 rounded-full bg-neutral-500 opacity-80 hover:opacity-100 cursor-pointer duration-100 absolute top-2 right-2"
              onClick={() => setIsOpen(false)}
            >
              <IconX stroke={2} className="h-4 w-4" />
            </button>
          </div>
        </Modal>
      </>
    )
  );
};

export default BeyPicker;
