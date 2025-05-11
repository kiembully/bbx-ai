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

const BeyPicker: FC<BeyPickerProps> = ({ build, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalLabel, setModalLabel] = useState('');
  const [modalType, setModalType] = useState('');
  const [parts, setParts] = useState<Blade[] | Ratchet[] | Bit[]>([]);
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
    e.preventDefault();
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const placeholders = [`Search for ${modalType}'s name . . .`];

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
    let parts = '';
    if (modalType === 'Blades') {
      parts = 'blade';
    }
    if (modalType === 'Ratchet') {
      parts = 'ratchet';
    }
    if (modalType === 'Bits') {
      parts = 'bit';
    }

    handlePartSelect(parts as 'blade' | 'ratchet' | 'bit', item, name === 'Opponent' ? 'opponent' : 'my');
  };

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
              <span className="text-neutral-200">{build && build.Parts.Blade}</span>
            </div>
          </div>
          <div
            onClick={() => handleOpenDialog({ label: name, type: 'Ratchet', isOpen: true })}
            className="w-full h-auto bg-neutral-700 rounded-lg cursor-pointer hover:scale-105 duration-150"
          >
            <div className={`flex items-center gap-2 p-4 flex-row`}>
              <IconFlareFilled className={`text-neutral-200 h-10 w-10`} />
              <span className="text-neutral-200">{build && build.Parts.Ratchet}</span>
            </div>
          </div>
          <div
            onClick={() => handleOpenDialog({ label: name, type: 'Bits', isOpen: true })}
            className="w-full h-auto bg-neutral-700 rounded-lg cursor-pointer hover:scale-105 duration-150"
          >
            <div className={`flex items-center gap-2 p-4 flex-row`}>
              <IconLabelFilled className={`text-neutral-200 h-10 w-10 rotate-90`} />
              <span className="text-neutral-200">{build ? build.Parts.Bit : 'Pick a Bit'}</span>
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

        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} fullView={true}>
          <div className="flex flex-col h-full">
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
            <div className="flex-1 overflow-y-auto my-10">
              <CardHover
                data={parts}
                loading={loading}
                variant="selectable"
                onSelect={handleSelectCard}
              />
            </div>
            <div className="w-full gap-4 flex items-center justify-center">
              {/* <button type='button' className='py-2 px-4 cursor-pointer'>Select</button> */}
              <button
                type="button"
                className="py-2 px-4 cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      </>
    )
  );
};

export default BeyPicker;
