import { IconX } from '@tabler/icons-react';
import NextImage from './Shared/NextImage/NextImage';
import { BeyPart, PartType } from '@/model/collections';

interface ViewPartsProps {
  selectedItem: BeyPart | null;
  modalType: PartType | '';
  setIsOpen: (val: boolean) => void;
}

const ViewParts: React.FC<ViewPartsProps> = ({ selectedItem, modalType, setIsOpen }) => {
  return (
    <div className="flex p-4 relative w-full">
      <div className="flex flex-col gap-2 md:gap-4 w-full">
        <div className="w-full items-center justify-center mb-6">
          {selectedItem?.Image ? (
            <NextImage
              src={selectedItem.Image}
              alt={selectedItem.Name}
              fill
              className="z-10 absolute object-fit overflow-hidden"
              containerClass="mx-auto relative w-40 md:w-60 h-40 md:h-60 md:mx-auto"
            />
          ) : (
            <NextImage
              src={`/assets/unlocked-${modalType ? modalType.toLowerCase() : 'blade'}.png`}
              alt="Placeholder"
              height={300}
              width={300}
              className="z-10 relative w-full rounded-lg overflow-hidden"
              containerClass="mx-auto relative w-40 md:w-60 h-40 md:h-60 mx-auto"
            />
          )}
        </div>
        <div className="flex flex-col w-full text-white">
          <h2 className="text-xl font-bold mb-2">{selectedItem?.Name}</h2>
          <p className="flex justify-between">
            <span>Attack:</span> {selectedItem?.Attack || '—'}
          </p>
          <p className="flex justify-between">
            <span>Defense:</span> {selectedItem?.Defense || '—'}
          </p>
          <p className="flex justify-between">
            <span>Stamina:</span> {selectedItem?.Stamina || '—'}
          </p>
          <p className="flex justify-between">
            <span>Spin:</span> {selectedItem?.Weight + ' grams' || '—'}
          </p>
          {selectedItem?.Series && (
            <p className="flex justify-between">
              <span>Series:</span> {selectedItem?.Series || '—'}
            </p>
          )}
          {selectedItem?.Type && (
            <p className="flex justify-between">
              <span>Type:</span> {selectedItem?.Type || '—'}
            </p>
          )}
          {selectedItem?.Spin && (
            <p className="flex justify-between">
              <span>Spin:</span> {selectedItem?.Spin || '—'}
            </p>
          )}
          {selectedItem?.Burst && (
            <p className="flex justify-between">
              <span>Burst:</span> {selectedItem?.Burst || '—'}
            </p>
          )}
          {selectedItem?.Dash && (
            <p className="flex justify-between">
              <span>Dash:</span> {selectedItem?.Dash || '—'}
            </p>
          )}
        </div>
      </div>
      <button
        type="button"
        className="rounded-full absolute top-4 right-4 bg-neutral-500 opacity-80 hover:opacity-100 cursor-pointer duration-100 w-10 h-10 flex items-center justify-center"
        onClick={() => setIsOpen(false)}
      >
        <IconX stroke={2} className="h-6 w-6" />
      </button>
    </div>
  );
};

export default ViewParts;
