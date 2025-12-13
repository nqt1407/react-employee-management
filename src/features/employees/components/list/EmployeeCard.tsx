import { XCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button } from '@/components/forms/button';
import { Employee } from '@/types/api/employee';

import { calculateTotalExperience, getAllImages } from '../../helper';
import { useDeleteEmployee } from '../../hooks/use-delete-employee';

type EmployeeCardProps = {
  employeeData: Employee;
};

export const EmployeeCard = ({ employeeData }: EmployeeCardProps) => {
  const navigate = useNavigate();
  const { mutate: deleteEmployeeMutation } = useDeleteEmployee();

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
          <p>{lastPosition.positionResourceName ?? '-'}</p>
          <p className="w-60 truncate">
            {latestToolLanguage?.description ?? '-'}
          </p>
        </div>
      )}
    </div>
  );
};
