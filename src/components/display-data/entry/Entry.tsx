import clsx from 'clsx';

export type EntryProps = {
  label: string | React.ReactNode;
  content: React.ReactNode;
  className?: string;
};

export const Entry = ({ label, content, className }: EntryProps) => (
  <div
    className={clsx(
      'grid grid-cols-1 sm:grid-cols-2 sm:gap-8 sm:py-2',
      className,
    )}
  >
    <dt className="text-sm">{label}</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0">{content}</dd>
  </div>
);
