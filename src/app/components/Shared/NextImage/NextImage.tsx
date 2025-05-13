'use client';
import React, { useState } from 'react';
import Image from 'next/image';

interface NextImageProps {
  src: string;
  alt: string;
  height?: number;
  width?: number;
  fill?: boolean;
  className?: string;
  containerClass?: string;
  variant?: string;
  bgPlaceholderColor?: string;
  priority?: boolean;
  loading?: boolean;
}

const NextImage: React.FC<NextImageProps> = ({
  src,
  alt,
  height,
  width,
  fill = false,
  className = '',
  containerClass = '',
  variant = '',
  bgPlaceholderColor,
  priority = false,
  loading = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const placeholderImage = '/assets/images/game-placeholder.png';

  const handleError = () => {
    setHasError(true); // If the image fails to load, set the state to true
  };

  const renderImagePlaceholder = (variant: string) => {
    switch (variant) {
      case 'background':
        return (
          <div
            className={`absolute inset-0 bg-[${bgPlaceholderColor ? bgPlaceholderColor : 'transparent'}]`}
          />
        );
      default:
        return (
          <div className="absolute flex item-center justify-center inset-0 transparent animate-pulse rounded-md">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600 self-center"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className={containerClass}>
      {(isLoading || loading) && renderImagePlaceholder(variant)}
      <Image
        src={hasError ? placeholderImage : src}
        alt={alt}
        height={height}
        width={width}
        fill={fill}
        className={className}
        priority={priority}
        onLoad={() => setIsLoading(false)}
        onError={handleError}
      />
    </div>
  );
};

export default NextImage;
