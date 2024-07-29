import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/forms/button';

export const NotFoundRoute = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex flex-row">
        <h1 className="font-bold text-2xl">{t('misc.notFound.title')}</h1>
        <div className="inline-block min-h-[1em] w-px self-stretch bg-gray-200 mx-2" />
        <p className="text-lg self-center">{t('misc.notFound.message')}</p>
      </div>
      <Button className="mt-8" onClick={() => navigate('/')}>
        {t('common.button.backToHome')}
      </Button>
    </div>
  );
};
