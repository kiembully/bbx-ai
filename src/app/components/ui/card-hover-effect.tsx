import { cn } from '@/app/lib/utils';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Build } from '../Dashboard/types';
import { HoverBorderGradient } from './hover-border-gradiient';
import NextImage from '../Shared/NextImage/NextImage';
import { IconEye } from '@tabler/icons-react';

export const HoverEffect = ({
  items,
  className,
  loading,
  variant = 'default', // 'default' | 'selectable'
  onSelect,
  build,
  type,
}: {
  items: {
    Name: string;
    Image?: string;
    link?: string;
  }[];
  className?: string;
  loading?: boolean;
  variant?: 'default' | 'selectable';
  onSelect?: (item: { Name: string }) => void;
  build?: Build;
  type?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleClick = (item: { Name: string }) => {
    if (variant === 'selectable' && typeof onSelect === 'function') {
      onSelect(item);
    }
  };

  const handleCardImage = (type: string) => {
    switch (type) {
      case 'Blade': {
        return 'blade';
      }
      case 'Ratchet': {
        return 'ratchet';
      }
      default: {
        return 'bit';
      }
    }
  };

  return (
    <div className={cn('flex flex-wrap', className)}>
      {items.map((item, idx) => (
        <div
          key={item?.Name}
          className="relative group block p-2 h-full w-full max-w-full md:max-w-[350px] mx-auto cursor-pointer"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => handleClick(item)}
        >
          {variant === 'selectable' && (
            <div
              className={cn(
                'h-[18px] md:h-4 w-[18px] md:w-4 rounded-full absolute top-4 md:top-6 right-4 md:right-6 z-30 border-2',
                build?.Name.includes(item.Name)
                  ? 'bg-green-700 border-grey-400'
                  : 'bg-black border-gray-400'
              )}
            />
          )}

          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
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
            {item.Image ? (
              <NextImage
                src={item.Image}
                alt="Parts image"
                fill
                className="z-10 absolute object-fit overflow-hidden"
                containerClass="relative w-20 md:w-40 h-20 md:h-40 md:mx-auto"
              />
            ) : (
              <NextImage
                src={`/assets/unlocked-${type ? handleCardImage(type) : 'blade'}.png`}
                alt="Parts placeholder image"
                height={300}
                width={300}
                className="z-10 relative w-full rounded-lg overflow-hidden"
                containerClass="relative w-40 h-40 mx-auto"
              />
            )}
            <div className="flex gap-2 justify-between items-center w-full mt-0 md:mt-4">
              <CardTitle className="text-sm md:text-xl">
                {loading ? (
                  <div className="h-2.5 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 mb-4"></div>
                ) : (
                  item.Name
                )}
              </CardTitle>
              <HoverBorderGradient
                className="flex gap-2 cursor-pointer text-neutral-800 opacity-90 hover:opacity-100 duration-100 bg-sky-500 px-2 py-1"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <div className="hidden md:flex">View</div>
                <IconEye stroke={2} />
              </HoverBorderGradient>
            </div>
          </Card>
        </div>
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
        <div className="p-0 md:p-4 flex md:block w-full justify-between gap-2">{children}</div>
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
  return <h4 className={cn('text-zinc-100 font-bold tracking-wide', className)}>{children}</h4>;
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
