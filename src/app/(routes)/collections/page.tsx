'use client';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/app/layouts/DashboardLayout';
import { useBeyDataStore } from '@/store/useBeyDataStore';
import { CardHover } from '@/app/components/Shared/Cards/Cards';
import { BeyPart, Bit, Blade, PartType, Ratchet } from '@/model/collections';
import { PlaceholdersAndVanishInput } from '@/app/components/ui/placeholder-and-vanish-inputs';
import CustomSelect from '@/app/components/Shared/Select/CustomSelect';
import Modal from '@/app/components/Shared/Modal/Modal';
import CardSkeleton from '@/app/components/Shared/Cards/CardSkeleton';
import ViewParts from '@/app/components/ViewParts';

const statsOptions = ['Attack', 'Defense', 'Stamina', 'Burst', 'Dash', 'Weight'];
const partsOptions = ['Blades', 'Ratchets', 'Bits'];
const sortOptions = ['Ascending', 'Descending'];

const Collections = () => {
  const { fetchBeyData, blades, ratchets, bits, loading } = useBeyDataStore();
  const [filteredParts, setFilteredParts] = useState<typeof parts>([]);
  const [parts, setParts] = useState<Blade[] | Ratchet[] | Bit[]>([]);
  const [filterValue, setFilterValue] = useState('');
  const [modalType, setModalType] = useState<PartType | ''>(PartType.Blade);
  const [selectedSort, setSelectedSort] = useState('Descending');
  const [selectedStat, setSelectedStat] = useState('Attack');
  const [selectedPart, setSelectedPart] = useState('Blades');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BeyPart | null>(null);

  const handleView = (name: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allParts: any = [...blades, ...ratchets, ...bits];
    const foundItem = allParts.find((item: { Name: string }) => item.Name === name) || null;

    setSelectedItem(foundItem);
    setIsOpen(true);
  };

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

  useEffect(() => {
    fetchBeyData();
  }, [fetchBeyData]);

  useEffect(() => {
    let selected: Blade[] | Ratchet[] | Bit[] = [];

    switch (selectedPart.toLowerCase()) {
      case 'blades':
        selected = blades;
        setModalType(PartType.Blade);
        break;
      case 'ratchets':
        selected = ratchets;
        setModalType(PartType.Ratchet);
        break;
      case 'bits':
        selected = bits;
        setModalType(PartType.Bit);
        break;
      default:
        selected = [];
    }

    // Apply filter
    let filtered = selected;
    if (filterValue.trim() !== '') {
      const query = filterValue.toLowerCase();
      filtered = selected.filter((part) =>
        Object.values(part).some(
          (val) => typeof val === 'string' && val.toLowerCase().includes(query)
        )
      );
    }

    // Apply sorting by stat
    if (selectedStat && selectedSort) {
      filtered = [...filtered].sort((a, b) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aVal = Number((a as any)[selectedStat]);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bVal = Number((b as any)[selectedStat]);

        if (!isNaN(aVal) && !isNaN(bVal)) {
          return selectedSort === 'Ascending' ? aVal - bVal : bVal - aVal;
        }

        return 0;
      });
    }

    setParts(selected);
    setFilteredParts(filtered);
  }, [selectedPart, selectedStat, selectedSort, filterValue, blades, ratchets, bits]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <DashboardLayout>
      <div className="p-4 h-full w-full gap-2 flex flex-col md:flex-row">
        <div className="flex w-full">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col md:flex-row items-center justify-between gap-2 p-2 rounded-lg md:rounded-4xl bg-black pr-2 md:pr-6">
              <div className="flex w-full max-w-xl">
                <PlaceholdersAndVanishInput
                  placeholders={[
                    `Search for ${modalType}${modalType !== PartType.Blade ? 's' : ''} name . . .`,
                  ]}
                  onChange={handleChange}
                  newValue={filterValue}
                  onSubmit={onSubmit}
                  variant="search"
                />
              </div>
              <div className="flex gap-2">
                <CustomSelect
                  value={selectedPart}
                  options={partsOptions}
                  onChange={setSelectedPart}
                  variant="collections"
                />
                <CustomSelect
                  value={selectedStat}
                  options={statsOptions}
                  onChange={setSelectedStat}
                  variant="collections"
                />
                <CustomSelect
                  value={selectedSort}
                  options={sortOptions}
                  onChange={setSelectedSort}
                  variant="collections"
                />
              </div>
            </div>
            <div className="max-h-[80vh] overflow-y-auto w-full">
              {loading ? (
                <div className="flex flex-wrap gap-4">
                  {Array.from({ length: 9 }).map((_, idx) => (
                    <CardSkeleton key={idx} />
                  ))}
                </div>
              ) : (
                <CardHover data={filteredParts} loading={loading} onView={handleView} />
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ViewParts selectedItem={selectedItem} modalType={modalType} setIsOpen={setIsOpen} />
      </Modal>
    </DashboardLayout>
  );
};

export default Collections;
