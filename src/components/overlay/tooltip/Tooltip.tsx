import clsx from 'clsx';
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

type ColorScheme = 'black' | 'gray';

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

const TOOLTIP_MARGIN = 8;

const tooltipColors: Record<ColorScheme, string> = {
  gray: 'bg-gray-200 text-black',
  black: 'bg-gray-700 text-white',
};

const arrowColors: Record<ColorScheme, string> = {
  gray: 'bg-gray-200',
  black: 'bg-gray-700',
};

const getArrowPosition = (direction: Direction) => {
  switch (direction) {
    case 'top':
    case 'top-start':
    case 'top-end':
      return 'bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full';
    case 'bottom':
    case 'bottom-start':
    case 'bottom-end':
      return 'top-0 left-1/2 transform -translate-x-1/2 -translate-y-full';
    case 'left':
    case 'left-start':
    case 'left-end':
      return 'right-0 top-1/2 transform -translate-y-1/2 translate-x-full';
    case 'right':
    case 'right-start':
    case 'right-end':
      return 'left-0 top-1/2 transform -translate-y-1/2 -translate-x-full';
    default:
      return '';
  }
};

const getTooltipPosition = (
  direction: Direction,
  triggerRect: DOMRect,
  tooltipRect: DOMRect,
) => {
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  const scrollX = window.scrollX || document.documentElement.scrollLeft;

  let top = 0;
  let left = 0;

  switch (direction) {
    case 'top':
      top = triggerRect.top + scrollY - tooltipRect.height - TOOLTIP_MARGIN;
      left =
        triggerRect.left +
        scrollX +
        triggerRect.width / 2 -
        tooltipRect.width / 2;
      break;
    case 'top-start':
      top = triggerRect.top + scrollY - tooltipRect.height - TOOLTIP_MARGIN;
      left = triggerRect.left + scrollX;
      break;
    case 'top-end':
      top = triggerRect.top + scrollY - tooltipRect.height - TOOLTIP_MARGIN;
      left = triggerRect.right + scrollX - tooltipRect.width;
      break;
    case 'bottom':
      top = triggerRect.bottom + scrollY + TOOLTIP_MARGIN;
      left =
        triggerRect.left +
        scrollX +
        triggerRect.width / 2 -
        tooltipRect.width / 2;
      break;
    case 'bottom-start':
      top = triggerRect.bottom + scrollY + TOOLTIP_MARGIN;
      left = triggerRect.left + scrollX;
      break;
    case 'bottom-end':
      top = triggerRect.bottom + scrollY + TOOLTIP_MARGIN;
      left = triggerRect.right + scrollX - tooltipRect.width;
      break;
    case 'left':
      top =
        triggerRect.top +
        scrollY +
        triggerRect.height / 2 -
        tooltipRect.height / 2;
      left = triggerRect.left + scrollX - tooltipRect.width - TOOLTIP_MARGIN;
      break;
    case 'left-start':
      top = triggerRect.top + scrollY;
      left = triggerRect.left + scrollX - tooltipRect.width - TOOLTIP_MARGIN;
      break;
    case 'left-end':
      top = triggerRect.bottom + scrollY - tooltipRect.height;
      left = triggerRect.left + scrollX - tooltipRect.width - TOOLTIP_MARGIN;
      break;
    case 'right':
      top =
        triggerRect.top +
        scrollY +
        triggerRect.height / 2 -
        tooltipRect.height / 2;
      left = triggerRect.right + scrollX + TOOLTIP_MARGIN;
      break;
    case 'right-start':
      top = triggerRect.top + scrollY;
      left = triggerRect.right + scrollX + TOOLTIP_MARGIN;
      break;
    case 'right-end':
      top = triggerRect.bottom + scrollY - tooltipRect.height;
      left = triggerRect.right + scrollX + TOOLTIP_MARGIN;
      break;
    default:
      break;
  }

  return { top, left };
};

export type TooltipProps = {
  label: string;
  children: React.ReactNode;
  hasArrow?: boolean;
  direction?: Direction;
  colorScheme?: ColorScheme;
};

export const Tooltip: React.FC<TooltipProps> = ({
  label,
  children,
  hasArrow = false,
  direction = 'top',
  colorScheme = 'gray',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState({ top: 0, left: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const position = getTooltipPosition(direction, triggerRect, tooltipRect);
      setTooltipStyle(position);
      setIsTransitioning(true);
    }
  }, [isVisible, direction]);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTransitioning(false);
    setTimeout(() => setIsVisible(false), 200);
  };

  return (
    <div
      className="w-full cursor-pointer"
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible &&
        ReactDOM.createPortal(
          <div
            ref={tooltipRef}
            style={tooltipStyle}
            className={clsx(
              'absolute z-50 w-max min-w-[120px] text-sm rounded-lg px-3 py-2 shadow-lg',
              'transition-opacity duration-200 ease-in-out',
              {
                'opacity-100': isTransitioning,
                'opacity-0': !isTransitioning,
              },
              tooltipColors[colorScheme],
            )}
          >
            {label}
            {hasArrow && (
              <div
                className={clsx(
                  'absolute w-2 h-2 bg-gray-700 origin-center rotate-45 bottom-1',
                  getArrowPosition(direction),
                  arrowColors[colorScheme],
                )}
              />
            )}
          </div>,
          document.body,
        )}
    </div>
  );
};
