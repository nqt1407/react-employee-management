import { useTranslation } from 'react-i18next';

export const ErrorFallBack = () => {
  const { t } = useTranslation();
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <h1 className="text-4xl">{t('components.errors.errorFallBack')}</h1>
    </div>
  );
};
