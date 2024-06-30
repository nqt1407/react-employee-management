import { clsx } from 'clsx';
import React from 'react';
import { useFieldArray, useFormContext, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  InputText,
  Select,
  Form,
  Option,
  Textarea,
} from '@/components/forms';
import { generateYearOptions } from '@/utils/date';

import { transformPositionResourceData } from '../../helper';
import { useDeleteEmployee } from '../../hooks/use-delete-employee';
import { usePositionResources } from '../../hooks/use-position-resources';

import { employeeSchema, EmployeeFormValues } from './schema';

// Generate year options
const yearOptions = generateYearOptions(2010, new Date().getFullYear());
const firstYearOptionsValue = yearOptions[0].value as number;
const lastYearOptionsValue = yearOptions[yearOptions.length - 1]
  .value as number;

type RemoveButtonProps = {
  className?: string;
  onClick: () => void;
};

const RemoveButton = ({
  onClick: onClickProp,
  className,
}: RemoveButtonProps) => {
  return (
    <Button
      className={className}
      size="sm"
      colorScheme="red"
      variant="text"
      onClick={onClickProp}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </Button>
  );
};

type ImageUploaderProps = {
  name: `positions.${number}.toolLanguages.${number}.images`;
  error?: string;
};

const ImageUploader: React.FC<ImageUploaderProps> = ({ name, error }) => {
  const { t } = useTranslation();
  const { control, setValue, watch } = useFormContext<EmployeeFormValues>();
  const images = watch(name) || [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setValue(name, [...images, ...newFiles]);
    }
  };

  const handleImageRemove = (index: number) => {
    setValue(
      name,
      images.filter((_, i) => i !== index),
    );
  };

  return (
    <div className="space-y-4">
      <Controller
        name={name}
        control={control}
        render={() => (
          <>
            <label
              htmlFor="fileInputDragDrop"
              className="cursor-pointer font-medium text-blue-700 group-focus-within:underline dark:text-blue-600"
            >
              <input
                id="fileInputDragDrop"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="border p-2 rounded-md w-full text-gray-700"
                hidden
              />
              {t('common.button.uploadImage')}
            </label>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </>
        )}
      />
      <div className="flex flex-wrap gap-10 mt-4">
        {images.map((image, index: number) => (
          <div
            key={index}
            className="relative w-24 h-24 border border-gray-300 p-1"
          >
            <img
              src={URL.createObjectURL(image)}
              alt={`Selected image ${index + 1}`}
              className="object-cover w-full h-full"
            />
            <RemoveButton
              className="absolute -top-4 -right-8 px-2 py-1 opacity-0 hover:opacity-100 transition-opacity duration-300"
              onClick={() => handleImageRemove(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const ToolsForm: React.FC<{ posNumb: number; toolOptions: Option[] }> = ({
  posNumb,
  toolOptions,
}) => {
  const { t } = useTranslation();
  const { control, register, formState } = useFormContext<EmployeeFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `positions.${posNumb}.toolLanguages`,
  });

  const handleAddTool = () => {
    append({
      toolLanguageResourceId: 1,
      from: firstYearOptionsValue,
      to: lastYearOptionsValue,
    });
  };

  return (
    <>
      {fields.map((field, index) => (
        <React.Fragment key={field.id}>
          <div className="flex justify-start flex-col md:flex-row md:space-x-6">
            <div className="flex w-full">
              <Select
                label={t('employee.form.input.tool.title')}
                required
                options={toolOptions}
                register={register(
                  `positions.${posNumb}.toolLanguages.${index}.toolLanguageResourceId`,
                  {
                    valueAsNumber: true,
                  },
                )}
              />
              <RemoveButton
                className={clsx('md:hidden mt-7', {
                  hidden: fields.length <= 1,
                })}
                onClick={() => remove(index)}
              />
            </div>
            <div className="flex w-full space-x-4">
              <Select
                label={t('employee.form.input.toolExperienceFrom.title')}
                options={yearOptions}
                register={register(
                  `positions.${posNumb}.toolLanguages.${index}.from`,
                  {
                    valueAsNumber: true,
                  },
                )}
                error={
                  formState.errors?.positions?.[posNumb]?.toolLanguages?.[index]
                    ?.from?.message
                }
              />
              <span className="pt-9">-</span>
              <Select
                label={t('employee.form.input.toolExperienceTo.title')}
                options={yearOptions}
                register={register(
                  `positions.${posNumb}.toolLanguages.${index}.to`,
                  {
                    valueAsNumber: true,
                    deps: [`positions.${posNumb}.tools.${index}.from`],
                  },
                )}
                error={
                  formState.errors?.positions?.[posNumb]?.toolLanguages?.[index]
                    ?.to?.message
                }
              />
            </div>
            <div
              className={clsx('hidden', {
                'md:block': fields.length > 1,
              })}
            >
              <RemoveButton className="mt-7" onClick={() => remove(index)} />
            </div>
          </div>
          <Textarea
            register={register(
              `positions.${posNumb}.toolLanguages.${index}.description`,
            )}
            placeholder={t('employee.form.input.toolDescription.placeholder')}
          />
          <ImageUploader
            name={`positions.${posNumb}.toolLanguages.${index}.images`}
            error={
              formState.errors?.positions?.[posNumb]?.toolLanguages?.[index]
                ?.images?.message
            }
          />
        </React.Fragment>
      ))}
      <Button size="sm" variant="outlined" onClick={handleAddTool}>
        {t('employee.form.button.addNewTools')}
      </Button>
    </>
  );
};

const PositionsForm = () => {
  const { t } = useTranslation();
  const { control, register, watch } = useFormContext<EmployeeFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'positions',
  });

  const { data: positionResources } = usePositionResources();

  const { posResOptions, posResMap } =
    transformPositionResourceData(positionResources);

  const handleAddPosition = () => {
    append({
      positionResourceId: 1,
      toolLanguages: [
        {
          toolLanguageResourceId: 1,
          from: firstYearOptionsValue,
          to: lastYearOptionsValue,
          images: [],
        },
      ],
    });
  };

  return (
    <>
      {fields.map((field, index) => (
        <React.Fragment key={field.id}>
          <div className="space-y-4">
            <div className="flex space-x-6 w-full">
              <Select
                label={t('employee.form.input.position.title')}
                required
                options={posResOptions}
                register={register(`positions.${index}.positionResourceId`, {
                  valueAsNumber: true,
                })}
              />
              <RemoveButton
                className={clsx('mt-7', {
                  hidden: fields.length <= 1,
                })}
                onClick={() => remove(index)}
              />
            </div>
            <ToolsForm
              posNumb={index}
              toolOptions={
                posResMap.get(watch(`positions.${index}.positionResourceId`)) ??
                []
              }
            />
          </div>
          {index < fields.length - 1 && (
            <hr className="my-4 border-t border-gray-300" />
          )}
        </React.Fragment>
      ))}
      <div className="self-end">
        <Button size="sm" onClick={handleAddPosition}>
          {t('employee.form.button.addNewPosition')}
        </Button>
      </div>
    </>
  );
};

type EmployeeFormProps = {
  type: 'create' | 'edit';
  initialData?: EmployeeFormValues;
  onSubmit: (formValues: EmployeeFormValues) => void;
};

export const EmployeeForm = ({
  type,
  initialData,
  onSubmit,
}: EmployeeFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: deleteEmployeeMutation } = useDeleteEmployee({
    onSuccess: () => navigate('/employees', { replace: true }),
  });

  return (
    <Form
      schema={employeeSchema}
      onSubmit={(formValue) => onSubmit(formValue)}
      options={{
        mode: 'all',
        defaultValues: initialData ?? {
          name: '',
          positions: [
            {
              positionResourceId: 1,
              toolLanguages: [
                {
                  toolLanguageResourceId: 1,
                  from: firstYearOptionsValue,
                  to: lastYearOptionsValue,
                  images: [],
                },
              ],
            },
          ],
        },
      }}
    >
      {({ register, formState }) => (
        <div className="flex flex-col space-y-6">
          <InputText
            label={t('employee.form.input.name.title')}
            placeholder={t('employee.form.input.name.placeholder')}
            required
            register={register('name')}
            className="h-11"
            error={formState.errors?.name?.message}
          />
          <PositionsForm />
          <hr className="my-4 border-t border-gray-300" />
          <div className="flex justify-between">
            {type === 'edit' && (
              <div>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => {
                    initialData?.id && deleteEmployeeMutation(initialData.id);
                  }}
                >
                  {t('common.button.delete')}
                </Button>
              </div>
            )}
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
