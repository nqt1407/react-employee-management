import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button, InputText, Form } from '@/components/forms';

import { employeeSchema, EmployeeFormValues } from './schema';

type EmployeeFormProps = {
  type: 'create' | 'edit';
  initialData?: EmployeeFormValues;
  onSubmit: (formValues: EmployeeFormValues) => void;
};

export const EmployeeForm = ({ initialData, onSubmit }: EmployeeFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Form
      schema={employeeSchema}
      onSubmit={(formValue) => onSubmit(formValue)}
      options={{
        mode: 'all',
        defaultValues: initialData,
      }}
    >
      {({ register, formState }) => (
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <InputText
              label={t('employee.form.input.name.title')}
              placeholder={t('employee.form.input.name.placeholder')}
              required
              register={register('name')}
              className="h-11"
              error={formState.errors?.name?.message}
            />

            <InputText
              label={'Email'}
              placeholder={'Email'}
              required
              register={register('name')}
              className="h-11"
              error={formState.errors?.name?.message}
            />
          </div>

          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <InputText
              label={'Phone'}
              placeholder={'Phone'}
              required
              register={register('name')}
              className="h-11"
              error={formState.errors?.name?.message}
            />

            <InputText
              label={'Hire date'}
              placeholder={'Hire date'}
              required
              register={register('name')}
              className="h-11"
              error={formState.errors?.name?.message}
            />
          </div>

          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <InputText
              label={'Department'}
              placeholder={'Department'}
              required
              register={register('name')}
              className="h-11"
              error={formState.errors?.name?.message}
            />

            <InputText
              label={'Position'}
              placeholder={'Position'}
              required
              register={register('name')}
              className="h-11"
              error={formState.errors?.name?.message}
            />
          </div>

          <hr className="my-4 border-t border-gray-300" />
          <div className="flex justify-between">
            <div className="flex justify-end w-full space-x-4">
              <Button
                size="sm"
                variant="outlined"
                onClick={() => {
                  navigate('/employees');
                }}
              >
                {t('common.button.cancel')}
              </Button>
              <Button
                size="sm"
                type="submit"
                colorScheme="green"
                disabled={!formState.isValid}
              >
                {t('common.button.submit')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Form>
  );
};

export type { EmployeeFormValues };
