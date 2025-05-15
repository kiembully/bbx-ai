'use client';
import React, { FC, useEffect, useState, useCallback } from 'react';
import { BeyPickerProps } from './types';
import Modal from '../Shared/Modal/Modal';
import { CardHover } from '../Shared/Cards/Cards';
import { PlaceholdersAndVanishInput } from '../ui/placeholder-and-vanish-inputs';
import { useBeyDataStore } from '@/store/useBeyDataStore';
import { Bit, Blade, Ratchet } from '@/model/collections';
import { BeyPart, useBeyBattleStore } from '@/store/useBeyBattleStore';
import { IconX, IconEdit } from '@tabler/icons-react';
import NextImage from '../Shared/NextImage/NextImage';
import CustomSelect from '../Shared/Select/CustomSelect';

enum PartType {
  Blade = 'Blade',
  Ratchet = 'Ratchet',
  Bit = 'Bit',
}

const partKeys = {
  [PartType.Blade]: 'blade',
  [PartType.Ratchet]: 'ratchet',
  [PartType.Bit]: 'bit',
} as const;

const partImages = {
  [PartType.Blade]: '/assets/unlocked-blade.png',
  [PartType.Ratchet]: '/assets/unlocked-ratchet.png',
  [PartType.Bit]: '/assets/unlocked-bit.png',
};

const BeyPicker: FC<BeyPickerProps> = ({ build, name, picking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalLabel, setModalLabel] = useState('');
  const [modalType, setModalType] = useState<PartType | ''>('');
  const [parts, setParts] = useState<Blade[] | Ratchet[] | Bit[]>([]);
  const [filteredParts, setFilteredParts] = useState<typeof parts>([]);
  const [filterValue, setFilterValue] = useState('');
  const { blades, ratchets, bits, loading } = useBeyDataStore();
  const [sortOption, setSortOption] = useState('Attack');

  // Set parts based on modalType
  useEffect(() => {
    switch (modalType) {
      case PartType.Blade:
        setParts(blades);
        break;
      case PartType.Ratchet:
        setParts(ratchets);
        break;
      case PartType.Bit:
        setParts(bits);
        break;
      default:
        setParts([]);
    }
  }, [modalType, blades, ratchets, bits]);

  // Filter logic
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setFilterValue(e.target.value);

    let allParts: typeof parts = [];
    switch (modalType) {
      case PartType.Blade:
        allParts = blades;
        break;
      case PartType.Ratchet:
        allParts = ratchets;
        break;
      case PartType.Bit:
        allParts = bits;
        break;
    }

    setFilteredParts(
      allParts.filter((part) =>
        Object.values(part).some(
          (val) => typeof val === 'string' && val.toLowerCase().includes(query)
        )
      )
    );
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFilterValue('');
    setFilteredParts(parts);
  };

  // Open dialog
  const handleOpenDialog = useCallback(
    ({ label, type, isOpen }: { label: string; type: PartType; isOpen: boolean }) => {
      setIsOpen(isOpen);
      setModalLabel(label);
      setModalType(type);
    },
    []
  );

  // Select part
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

    setPart(partType, part);

    const updatedCombo = { ...combo, [partType]: part };
    const isComplete = updatedCombo.blade && updatedCombo.ratchet && updatedCombo.bit;

    if (isComplete) {
      console.log(`✅ ${side === 'my' ? 'My BeyBlade' : 'Opponent'} is ready:`, updatedCombo);
    } else {
      console.log(`❌ ${side === 'my' ? 'My BeyBlade' : 'Opponent'} is not ready yet.`);
    }
  };

  // Card select handler
  const handleSelectCard = (item: { Name: string }) => {
    if (!modalType) return;
    handlePartSelect(
      partKeys[modalType as PartType],
      item,
      name === 'Opponent' ? 'opponent' : 'my'
    );
    setIsOpen(false);
    setFilterValue('');
    setFilteredParts(parts);
  };

  // Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Update filteredParts when parts change
  useEffect(() => setFilteredParts(parts), [parts]);

  // Sorting
  useEffect(() => {
    if (!sortOption) {
      setFilteredParts(parts);
      return;
    }
    setFilteredParts(
      [...parts].sort((a, b) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aVal = parseFloat((a as Record<string, any>)[sortOption] || '0');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bVal = parseFloat((b as Record<string, any>)[sortOption] || '0');
        return bVal - aVal;
      })
    );
  }, [sortOption, parts]);

  // Helper to render part button
  const renderPartButton = (
    type: PartType,
    label: string,
    image: string | undefined,
    partName: string | undefined
  ) => (
    <button
      type="button"
      disabled={picking}
      onClick={() => handleOpenDialog({ label: name ?? '', type, isOpen: true })}
      className="w-full h-auto bg-neutral-300 dark:bg-neutral-700 rounded-lg cursor-pointer hover:scale-105 duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <div className="flex items-center gap-4 p-4 flex-row text-black dark:text-white">
        {image ? (
          <NextImage
            src={image}
            alt="Parts placeholder image"
            fill
            className="z-10 relative object-fill rounded-lg overflow-hidden"
            containerClass="relative h-10 w-10 mx-auto"
          />
        ) : (
          <NextImage
            src={partImages[type]}
            alt="Parts placeholder image"
            height={300}
            width={300}
            className="z-10 relative w-full rounded-lg overflow-hidden"
            containerClass="relative h-10 w-10 mx-auto"
          />
        )}
        <span className="w-full text-left">{partName || `Pick a ${type}`}</span>
        <IconEdit stroke={2} />
      </div>
    </button>
  );

  if (!name) return null;

  return (
    <>
      <div className="flex gap-4 justify-between flex-col w-full">
        {renderPartButton(PartType.Blade, 'Blade', build.Images.Blade, build.Parts.Blade)}
        {renderPartButton(PartType.Ratchet, 'Ratchet', build.Images.Ratchet, build.Parts.Ratchet)}
        {renderPartButton(PartType.Bit, 'Bit', build.Images.Bit, build.Parts.Bit)}
      </div>

      <div className="border-2 border-neutral-700 rounded-lg p-4 grid grid-cols-1 gap-y-2">
        {(['Name', 'Spin', 'Series', 'Type'] as const).map((field) => (
          <div className="flex items-center gap-2" key={field}>
            {field}:
            {!picking ? (
              <span className="line-clamp-1 overflow-ellipsis text-lg font-semibold text-bl">
                {field === 'Name'
                  ? build.Name
                  : field === 'Spin'
                    ? build.Spin
                    : field === 'Series'
                      ? build.Series
                      : field === 'Type'
                        ? build.Type
                        : ''}
              </span>
            ) : (
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2" />
            )}
          </div>
        ))}
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} fullView>
        <div className="flex flex-col h-full p-4">
          <h2 className="mt-6 text-xl font-semibold mb-4 text-center text-white dark:text-white flex flex-col sm:flex-row justify-between max-w-xl mx-auto w-full items-center">
            <>
              {modalLabel === 'Opponent'
                ? `Pick Opponent's ${modalType}`
                : `Pick Your ${modalType}`}
            </>
            <div className="flex gap-2 mt-2 sm:mt-0">
              <CustomSelect value={sortOption} onChange={setSortOption} />
              <button
                type="button"
                className="rounded-full bg-neutral-500 opacity-80 hover:opacity-100 cursor-pointer duration-100 w-10 h-10 flex items-center justify-center"
                onClick={() => setIsOpen(false)}
              >
                <IconX stroke={2} className="h-6 w-6" />
              </button>
            </div>
          </h2>
          <PlaceholdersAndVanishInput
            placeholders={[
              `Search for ${modalType}${modalType !== PartType.Blade ? 's' : ''} name . . .`,
            ]}
            onChange={handleChange}
            newValue={filterValue}
            onSubmit={onSubmit}
          />
          <div className="flex-1 overflow-y-auto my-4 md:my-10">
            <CardHover
              data={filteredParts}
              loading={loading}
              variant="selectable"
              onSelect={handleSelectCard}
              build={build}
              type={modalType}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BeyPicker;
