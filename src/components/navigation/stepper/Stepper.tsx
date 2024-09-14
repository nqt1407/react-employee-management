import clsx from 'clsx';
import React, { useCallback, useMemo } from 'react';

import { StepperProps } from './types';

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentIndex,
  orientation = 'horizontal',
  className,
}) => {
  const isHorizontal = orientation === 'horizontal';

  const isLastStep = useCallback(
    (index: number) => index === steps.length - 1,
    [steps.length],
  );

  const isActive = useCallback(
    (index: number) => currentIndex >= index,
    [currentIndex],
  );

  const connectorStyle = useMemo(() => {
    return isHorizontal
      ? {
          display: 'block',
          position: 'absolute',
          top: '12px',
          left: 'calc(50% + 20px)',
          right: 'calc(-50% + 20px)',
        }
      : { display: 'block' };
  }, [isHorizontal]) as React.CSSProperties;

  return (
    <div
      className={clsx(
        'flex max-w-3xl mx-auto',
        isHorizontal ? 'flex-col' : 'flex-row',
        className,
      )}
    >
      <div
        className={clsx('flex', {
          'flex-row w-full mb-6': isHorizontal,
          'flex-col h-full mr-6': !isHorizontal,
        })}
      >
        {steps.map((step, stepIndex) => (
          <React.Fragment key={stepIndex}>
            <div className={clsx('relative px-2 block shrink grow basis-0')}>
              <div
                className={clsx('flex items-center py-1', {
                  'flex-col': isHorizontal,
                  'flex-row space-x-2': !isHorizontal,
                })}
              >
                {/* Step Indicator */}
                <div
                  className={clsx(
                    'flex items-center justify-center w-7 h-7 rounded-full text-white font-semibold',
                    isActive(stepIndex) ? 'bg-blue-500' : 'bg-gray-300',
                  )}
                >
                  {stepIndex + 1}
                </div>

                {/* Step Label */}
                <div
                  className={clsx(
                    'text-sm',
                    isActive(stepIndex) ? 'text-blue-500' : 'text-gray-500',
                  )}
                >
                  {step.label}
                </div>
              </div>

              {/* Connector */}
              <div className="flex space-x-6">
                <div style={connectorStyle}>
                  <span
                    className={clsx(
                      'block',
                      isActive(stepIndex)
                        ? 'border-blue-500'
                        : 'border-gray-300',
                      {
                        'border-t-2 m-w-6 w-full mt-[5px]': isHorizontal,
                        'border-l-2 min-h-6 h-full ml-[12px]': !isHorizontal,
                        'border-l-0': !isHorizontal && isLastStep(stepIndex),
                        hidden: isHorizontal && isLastStep(stepIndex),
                      },
                    )}
                  />
                </div>
                <div
                  className={clsx('text-sm', {
                    'hidden ': isHorizontal || !isActive(stepIndex),
                  })}
                >
                  {steps[stepIndex].description}
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
