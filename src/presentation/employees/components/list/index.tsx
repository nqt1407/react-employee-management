import { useState } from 'react';

import { Employees } from './Employees';
import { Search } from './Search';

export const EmployeesList = () => {
  const [searchQuery, setSearchQuery] = useState<string>();

  return (
    <>
      <Search onSubmit={setSearchQuery} />
      <Employees searchQuery={searchQuery} />
    </>
  );
};
