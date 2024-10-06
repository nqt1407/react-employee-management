import { Spinner } from '../../../feedback/spinner';

type LoadingProviderProps = {
  loading?: boolean;
  children: React.ReactNode;
};

export const LoadingProvider = ({
  loading,
  children,
}: LoadingProviderProps) => {
  return (
    <div className="relative">
      {loading && (
        <div
          key="loading"
          className="absolute inset-0 flex items-center justify-center z-10 bg-gray-100/50 bg-opacity-50"
        >
          <Spinner />
        </div>
      )}
      {children}
    </div>
  );
};
