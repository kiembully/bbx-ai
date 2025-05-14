'use client';
import React, { useState } from 'react';

interface CollapseItem {
  title: string;
  content: React.ReactNode;
}

interface CollapseProps {
  items: CollapseItem[];
}

const Collapse: React.FC<CollapseProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0); // First open by default

  const toggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <div className="flex flex-col w-full h-full border border-neutral-600 rounded overflow-hidden">
      {items.map((item, index) => (
        <div key={index} className="border-b border-neutral-700">
          <button
            onClick={() => toggle(index)}
            className="w-full px-4 py-3 text-left bg-neutral-800 text-white font-medium hover:bg-neutral-700"
          >
            {item.title}
          </button>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              activeIndex === index ? 'max-h-[1000px] p-4 opacity-100' : 'max-h-0 p-0 opacity-0'
            }`}
            style={{ transitionProperty: 'max-height, padding, opacity' }}
          >
            {/* ✅ Always mounted */}
            <div className="text-white">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Collapse;
