import { UserPlusIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { InputText, Button, Form } from '@/components/forms';

const searchSchema = z.object({
  search: z.string(),
});

export const Search = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="flex flex-col-reverse	justify-between md:flex-row">
      <Form
        schema={searchSchema}
        onSubmit={(formValue) =>
          setSearchParams(formValue.search ? { name: formValue.search } : {})
        }
        options={{
          defaultValues: {
            search: searchParams.get('name') || undefined,
          },
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
          startIcon={<UserPlusIcon className="size-6" />}
        >
          {t('employee.list.button.addEmployee')}
        </Button>
      </div>
    </div>
  );
};
