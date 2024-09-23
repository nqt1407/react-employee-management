import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import React, { useState } from 'react';

type Direction =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

const tooltipPositions: Record<Direction, string> = {
  top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
  'top-start': 'bottom-full left-0 mb-2',
  'top-end': 'bottom-full right-0 mb-2',
  bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
  'bottom-start': 'top-full left-0 mt-2',
  'bottom-end': 'top-full right-0 mt-2',
  left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
  'left-start': 'right-full top-0 mr-2',
  'left-end': 'right-full bottom-0 mr-2',
  right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  'right-start': 'left-full top-0 ml-2',
  'right-end': 'left-full bottom-0 ml-2',
};

const arrowPositions: Record<Direction, string> = {
  top: 'bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full rotate-45',
  'top-start': 'bottom-0 left-2 translate-y-full rotate-45',
  'top-end': 'bottom-0 right-2 translate-y-full rotate-45',
  bottom:
    'top-0 left-1/2 transform -translate-x-1/2 -translate-y-full rotate-45',
  'bottom-start': 'top-0 left-2 -translate-y-full rotate-45',
  'bottom-end': 'top-0 right-2 -translate-y-full rotate-45',
  left: 'right-0 top-1/2 transform -translate-y-1/2 translate-x-full rotate-45',
  'left-start': 'right-0 top-2 translate-x-full rotate-45',
  'left-end': 'right-0 bottom-2 translate-x-full rotate-45',
  right:
    'left-0 top-1/2 transform -translate-y-1/2 -translate-x-full rotate-45',
  'right-start': 'left-0 top-2 -translate-x-full rotate-45',
  'right-end': 'left-0 bottom-2 -translate-x-full rotate-45',
};

export type TooltipProps = {
  label: string;
  children: React.ReactNode;
  hasArrow?: boolean;
  direction?: Direction;
};

export const Tooltip: React.FC<TooltipProps> = ({
  label,
  children,
  hasArrow = false,
  direction = 'top',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="grid grid-flow-row relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div className="cursor-pointer">{children}</div>
      <Transition show={isVisible}>
        <div
          className={clsx(
            'absolute w-max bg-gray-700 text-white text-sm rounded-lg px-2 py-1 shadow-lg z-10',
            'transition duration-100 ease-in data-[closed]:opacity-0',
            tooltipPositions[direction],
          )}
        >
          {label}
          {hasArrow && (
            <div
              className={clsx(
                'absolute w-2 h-2 bg-gray-700 origin-center rotate-45 bottom-1',
                arrowPositions[direction],
              )}
            />
          )}
        </div>
      </Transition>
    </div>
  );
};
