import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { InputText, Button, Form } from '@/components/forms';

const searchSchema = z.object({
  search: z.string(),
});

type SearchProps = {
  onSubmit: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const Search = ({ onSubmit }: SearchProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col-reverse	justify-between md:flex-row">
      <Form
        schema={searchSchema}
        onSubmit={(formValue) => {
          onSubmit(formValue.search);
        }}
      >
        {({ register }) => (
          <div className="flex flex-row justify-start content-end space-x-4 w-96">
            <InputText
              label={`${t('employee.list.input.search.title')}:`}
              register={register('search')}
              placeholder={t('employee.list.input.search.placeholder')}
            />
            <div className="self-end">
              <Button size="sm" type="submit">
                {t('employee.list.button.search')}
              </Button>
            </div>
          </div>
        )}
      </Form>
      <div className="self-start md:self-end">
        <Button
          size="sm"
          colorScheme="green"
          onClick={() => navigate('./new')}
          startIcon={
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
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
              />
            </svg>
          }
        >
          {t('employee.list.button.addEmployee')}
        </Button>
      </div>
    </div>
  );
};
