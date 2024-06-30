import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/forms/button';
import { Head } from '@/components/seo/head';

export const LandingRoute = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Head title="Welcome" />
      <div className="flex flex-col justify-center items-center h-screen bg-white">
        <h1 className="text-6xl font-bold mb-4">{t('landing.title')}</h1>
        <Button onClick={() => navigate('/employees')}>
          {t('landing.button.title')}
        </Button>
      </div>
    </>
  );
};
