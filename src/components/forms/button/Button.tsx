import { Button as HeadlessUIButton } from '@headlessui/react';
import clsx from 'clsx';
import React, { useCallback } from 'react';

import { Spinner } from '../../feedback/spinner';

import { buttonContained } from './button-contained';
import { buttonOutlined } from './button-outlined';
import { buttonText } from './button-text';
import { ColorScheme } from './types';

const variants = {
  contained: buttonContained,
  outlined: buttonOutlined,
  text: buttonText,
};

const sizes = {
  xs: 'py-1 px-2 text-sm',
  sm: 'py-2 px-4 text-sm',
  md: 'py-2 px-6 text-md',
  lg: 'py-3 px-8 text-lg',
};

type ButtonIconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /**
   * The variant of Button
   */
  variant?: keyof typeof variants;
  /**
   * The color appearance of the Button
   */
  colorScheme?: ColorScheme;
  /**
   * The size of Button
   */
  size?: keyof typeof sizes;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Show spinner when loading
   */
  isLoading?: boolean;
  /**
   * Display text when loading
   */
  loadingText?: string;
  /**
   * Determines the placement of the spinner when isLoading is true
   */
  spinnerPlacement?: 'start' | 'end';
} & ButtonIconProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'contained',
      size = 'md',
      colorScheme = 'blue',
      className,
      startIcon,
      endIcon,
      isLoading = false,
      loadingText,
      spinnerPlacement = 'start',
      ...props
    },
    ref,
  ) => {
    const renderSpinner = useCallback(
      () => (
        <Spinner
          size={size}
          color={variant === 'contained' ? 'white' : colorScheme}
        />
      ),
      [size, variant, colorScheme],
    );

    return (
      <HeadlessUIButton
        ref={ref}
        type="button"
        className={clsx(
          'flex justify-center items-center rounded-md font-medium transition-all disabled:opacity-70 disabled:shadow-none disabled:cursor-not-allowed',
          sizes[size],
          variants[variant][colorScheme],
          className,
        )}
        {...props}
        disabled={isLoading || props.disabled}
      >
        {isLoading && spinnerPlacement === 'start' && renderSpinner()}

        {!isLoading && startIcon}

        <span className="mx-2">
          {loadingText && isLoading ? loadingText : props.children}
        </span>

        {!isLoading && endIcon}

        {isLoading && spinnerPlacement === 'end' && renderSpinner()}
      </HeadlessUIButton>
    );
  },
);

Button.displayName = 'Button';

export type { ColorScheme, ButtonProps };
