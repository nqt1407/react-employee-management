import { useMemo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';

import { Spinner } from '@/components/feedback/spinner';
import { Employee } from '@/types/api/employee';

import { useEmployees } from '../../hooks/use-employees';

import { EmployeeCard } from './EmployeeCard';

export const Employees = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const {
    data: employeesData,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useEmployees({
    params: {
      search: searchParams.get('name') || undefined,
    },
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const employees = useMemo(() => {
    return employeesData?.pages.reduce((acc, page) => {
      const items = page.pageItems ?? [];
      const mappedItems = items.map((item) => ({
        ...item,
        positions: item.positions ?? [],
      }));
      return [...acc, ...mappedItems];
    }, [] as Employee[]);
  }, [employeesData]);

  // * Check height to loading data in-case not provide the scroll
  useEffect(() => {
    const checkHeight = () => {
      if (
        containerRef.current &&
        containerRef.current.scrollHeight <= window.innerHeight &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    checkHeight();
    window.addEventListener('resize', checkHeight);

    return () => {
      window.removeEventListener('resize', checkHeight);
    };
  }, [employees, fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!employees?.length)
    return (
      <div
        role="list"
        aria-label="employees"
        className="flex h-40 flex-col items-center justify-center bg-white text-gray-500"
      >
        <p className="text-lg font-medium">
          {t('employee.list.noEmployeesFound')}
        </p>
      </div>
    );

  return (
    <div ref={containerRef} className="w-full">
      <InfiniteScroll
        dataLength={employees.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={
          <div className="flex h-48 w-full items-center justify-center">
            <Spinner size="md" />
          </div>
        }
        scrollThreshold={1}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {employees.map((emp) => (
            <EmployeeCard key={emp.id} employeeData={emp} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};
