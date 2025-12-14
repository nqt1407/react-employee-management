import * as React from 'react';

import { Head } from '../../seo/head';

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
  description?: string;
};

export const ContentLayout = ({
  children,
  title,
  description,
}: ContentLayoutProps) => {
  return (
    <>
      <Head title={title} description={description} />
      <div className="w-screen p-4 flex flex-col space-y-4">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        {children}
      </div>
    </>
  );
};
