import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import React from 'react';

import { usePagination, DOTS } from './use-pagination';

export type PaginationProps = {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
};

export const Pagination: React.FC<PaginationProps> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || !paginationRange || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className={clsx('flex items-center space-x-3', className)}>
      <li
        className={clsx('cursor-pointer', {
          'pointer-events-none text-gray-400': currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <ChevronLeftIcon className="size-4" aria-hidden="true" />
      </li>
      {paginationRange.map((pageNumber, idx) =>
        pageNumber === DOTS ? (
          <li key={idx} className="pagination-item dots text-gray-400">
            &#8230;
          </li>
        ) : (
          <li
            key={idx}
            className={clsx(
              'pagination-item cursor-pointer border py-1 px-3 rounded-md text-sm',
              'hover:text-blue-600 hover:font-bold hover:border-sky-500',
              pageNumber === currentPage
                ? 'text-blue-600 font-bold border-sky-500'
                : 'text-gray-600',
            )}
            onClick={() => onPageChange(pageNumber as number)}
          >
            {pageNumber}
          </li>
        ),
      )}
      <li
        className={clsx('cursor-pointer', {
          'pointer-events-none text-gray-400': currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <ChevronRightIcon className="size-4" aria-hidden="true" />
      </li>
    </ul>
  );
};
