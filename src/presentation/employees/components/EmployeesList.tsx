import { UserPlusIcon } from '@heroicons/react/24/outline';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Table } from '@/components/display-data';
import { Button } from '@/components/forms/button';
import { Employee } from '@/types/api/employee';

import { getEmployeeQueryOptions } from '../hooks/use-employee';
import { useEmployees } from '../hooks/use-employees';

export const EmployeesList = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const employeeQuery = useEmployees();

  const employees = employeeQuery.data?.items ?? [];

  return (
    <div className="flex flex-col space-y-4">
      <Button
        size="xs"
        colorScheme="green"
        onClick={() => navigate('./new')}
        startIcon={<UserPlusIcon className="size-6" />}
        className="self-end"
      >
        {t('employee.list.button.addEmployee')}
      </Button>
      <Table<Employee>
        data={employees}
        columns={[
          {
            title: 'Name',
            field: 'name',
          },
          {
            title: 'Email',
            field: 'email',
          },
        ]}
        onRow={(employee) => {
          return {
            onClick: () => {
              navigate(employee.id);
            },
            onMouseEnter: () => {
              queryClient.prefetchQuery({
                queryKey: getEmployeeQueryOptions(employee.id).queryKey,
              });
            },
          };
        }}
      />
    </div>
  );
};
