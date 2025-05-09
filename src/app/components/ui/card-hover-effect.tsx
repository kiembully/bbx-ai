import { cn } from '@/app/lib/utils';
import { AnimatePresence, motion } from 'motion/react';

import { useState } from 'react';

export const HoverEffect = ({
  items,
  className,
  loading,
}: {
  items: {
    Name: string;
    image?: string;
    link?: string;
  }[];
  className?: string;
  loading?: boolean;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10', className)}>
      {items.map((item, idx) => (
        <a
          href={item?.Name || '#'}
          key={item?.Name}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div
              className={cn(
                'flex items-center justify-center w-full h-48 bg-gray-700',
                loading && 'animate-pulse'
              )}
            >
              <svg
                className="w-full h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
            <CardTitle>
              {loading ? (
                <div className="h-2.5 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              ) : (
                item.Name
              )}
            </CardTitle>
            {/* <CardDescription>{item.description}</CardDescription> */}
          </Card>
        </a>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20',
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn('text-zinc-100 font-bold tracking-wide mt-4', className)}>{children}</h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p className={cn('mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm', className)}>
      {children}
    </p>
  );
};
