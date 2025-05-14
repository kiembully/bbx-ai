import { useEffect, useRef, useState } from 'react';

interface CustomSelectProps {
  value: string;
  onChange: (val: string) => void;
}

const CustomSelect = ({ value, onChange }: CustomSelectProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = ['Attack', 'Defense', 'Stamina', 'Burst', 'Dash', 'Weight'];

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative inline-block w-36" ref={dropdownRef} style={{ zIndex: 9999 }}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full text-left text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 inline-flex items-center justify-between"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {value ? `Top ${value}` : `Sort`}
        <svg
          className={`w-2.5 h-2.5 ml-2 transition-transform ${open ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1l4 4 4-4"
          />
        </svg>
      </button>

      {open && (
        <ul
          className="absolute mt-2 w-full bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200"
          role="listbox"
        >
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
                  value === option ? 'bg-gray-100 dark:bg-gray-600 font-medium' : ''
                }`}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
