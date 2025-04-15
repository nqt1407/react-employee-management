import { XCircleIcon } from '@heroicons/react/24/outline';
import { useMemo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Spinner } from '@/components/feedback/spinner';
import { Button } from '@/components/forms/button';
import { Employee } from '@/domain/entities/employee';

import {
  makePositionMap,
  calculateTotalExperience,
  getAllImages,
} from '../../helper';
import { useDeleteEmployee } from '../../hooks/use-delete-employee';
import { useEmployees } from '../../hooks/use-employees';
import { usePositionResources } from '../../hooks/use-position-resources';

type EmployeeCardProps = {
  employeeData: Employee;
  positionsMap: Map<number, string>;
};

const EmployeeCard = ({ employeeData, positionsMap }: EmployeeCardProps) => {
  const { mutate: deleteEmployeeMutation } = useDeleteEmployee();
  const navigate = useNavigate();

  const totalExperiences = calculateTotalExperience(employeeData.positions);
  const images = getAllImages(employeeData.positions);

  const lastPosition =
    employeeData.positions?.[employeeData.positions.length - 1];
  const latestToolLanguage = lastPosition?.toolLanguages.slice(-1)[0];

  return (
    <div
      className="relative flex flex-col h-full p-4 border rounded-lg shadow cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        navigate(`./${employeeData.id}`);
      }}
    >
      <Button
        className="absolute -top-4 -right-6 px-2 py-1 opacity-0 hover:opacity-100 transition-opacity duration-300"
        onClick={(e) => {
          e.stopPropagation();
          employeeData.id && deleteEmployeeMutation(employeeData.id);
        }}
        variant="text"
        colorScheme="red"
        size="xs"
        aria-label={`Delete ${employeeData.name}`}
        data-testid="delete-btn"
      >
        <XCircleIcon className="w-6 h-6" />
      </Button>
      {images.length > 0 && (
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          navigation={false}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="w-full h-48 md:h-36 lg:h-40"
        >
          {images.map((file, index) => (
            <SwiperSlide key={index}>
              <img
                src={URL.createObjectURL(file)}
                alt={`Employee ${employeeData.name} - File ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="flex justify-between space-x-2">
        <p>{employeeData.name}</p>
        {totalExperiences > 0 && (
          <p>{`${totalExperiences} ${totalExperiences > 1 ? 'years' : 'year'}`}</p>
        )}
      </div>
      {lastPosition && (
        <div className="flex flex-col space-y-2">
          <p>{positionsMap.get(lastPosition.positionResourceId)}</p>
          <p className="w-60 truncate">{latestToolLanguage?.description}</p>
        </div>
      )}
    </div>
  );
};

export const Employees = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const { data: positionResources } = usePositionResources();
  const {
    data: employeesData,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useEmployees({
    params: {
      search: searchParams.get('search') || undefined,
    },
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const employees = useMemo(() => {
    return employeesData?.pages.reduce((acc, page) => {
      return [...acc, ...page];
    }, []);
  }, [employeesData]);

  const posMap = makePositionMap(positionResources);

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
        <h4>{t('employee.list.noEmployeesFound')}</h4>
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
            <EmployeeCard
              key={emp.id}
              employeeData={emp}
              positionsMap={posMap}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};
