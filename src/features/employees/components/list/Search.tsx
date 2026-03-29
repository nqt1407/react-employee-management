import { UserPlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { InputText, Button } from '@/components/forms';
import { useDebounceFn } from '@/hooks/use-debounce-fn';

export const Search = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('name') || '');

  const { run: updateSearchParams } = useDebounceFn(
    (value: string) => setSearchParams(value ? { name: value } : {}),
    { delay: 500 },
  );

  return (
    <div className="flex flex-col-reverse justify-between md:flex-row">
      <div className="w-full lg:w-96 mt-2 lg:mt-0">
        <InputText
          label={`${t('employee.list.input.search.title')}:`}
          placeholder={t('employee.list.input.search.placeholder')}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            updateSearchParams(e.target.value);
          }}
        />
      </div>
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
