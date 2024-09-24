import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Table } from './Table';
import { RowSelectionModel, SortOrder } from './types';

const meta: Meta<typeof Table> = {
  title: 'Components/Display Data/Table/Enhanced',
  component: Table,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  tags: ['autodocs'],
};

export default meta;

type User = {
  id: number;
  createdAt: number;
  name: string;
  title: string;
  role: string;
  email: string;
};

type Story = StoryObj<typeof Table<User>>;

const data: User[] = [
  {
    id: 1,
    createdAt: Date.now(),
    name: 'Jane Cooper',
    title: 'Regional Paradigm Technician',
    role: 'Admin',
    email: 'jane.cooper@example.com',
  },
  {
    id: 2,
    createdAt: Date.now(),
    name: 'Cody Fisher',
    title: 'Product Directives Officer',
    role: 'Owner',
    email: 'cody.fisher@example.com',
  },
  {
    id: 3,
    createdAt: Date.now(),
    name: 'Esther Howard',
    title: 'Forward Response Developer',
    role: 'Member',
    email: 'esther.howard@example.com',
  },
  {
    id: 4,
    createdAt: Date.now(),
    name: 'Kristin Watson',
    title: 'Direct Intranet Strategist',
    role: 'Admin',
    email: 'kristin.watson@example.com',
  },
  {
    id: 5,
    createdAt: Date.now(),
    name: 'Cameron Williamson',
    title: 'Internal Applications Engineer',
    role: 'Member',
    email: 'cameron.williamson@example.com',
  },
];

export const Default: Story = {
  render: () => {
    return (
      <Table
        data={data}
        columns={[
          {
            title: 'ID',
            field: 'id',
          },
          {
            title: 'Name',
            field: 'name',
          },
          {
            title: 'Title',
            field: 'title',
          },
          {
            title: 'Role',
            field: 'role',
          },
          {
            title: 'Email',
            field: 'email',
          },
        ]}
      />
    );
  },
};

export const WithSelection: Story = {
  render: () => {
    const [selectedData, setSelectedData] = useState<RowSelectionModel>([]);

    return (
      <Table
        data={data}
        rowSelection={{
          type: 'checkbox',
          hideSelectAll: true,
          selectedRowIds: selectedData,
          onChange: (selectedRowIds) => setSelectedData(selectedRowIds),
        }}
        columns={[
          {
            title: 'ID',
            field: 'id',
          },
          {
            title: 'Name',
            field: 'name',
          },
          {
            title: 'Title',
            field: 'title',
          },
          {
            title: 'Role',
            field: 'role',
          },
          {
            title: 'Email',
            field: 'email',
          },
        ]}
      />
    );
  },
};

export const WithFilter: Story = {
  render: () => {
    const [dataState, setDataState] = useState<User[]>(data);
    const [, setActiveFilters] = useState<{
      [key in keyof User]?: string[];
    }>({});

    const handleFilter = (field: keyof User, value: string[]) => {
      setActiveFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters, [field]: value };

        const hasActiveFilters = Object.values(updatedFilters).some(
          (val) => val && val.length,
        );
        if (!hasActiveFilters) {
          setDataState(data);
          return updatedFilters;
        }

        const filteredData = data.filter((el) =>
          Object.entries(updatedFilters).every(([key, filterValues]) => {
            if (!filterValues?.length) return true;
            return filterValues.includes(String(el[key as keyof User]));
          }),
        );

        setDataState(filteredData);
        return updatedFilters;
      });
    };

    return (
      <Table
        data={dataState}
        columns={[
          {
            title: 'ID',
            field: 'id',
          },
          {
            title: 'Name',
            field: 'name',
            filters: [
              { text: 'Jane Cooper', value: 'Jane Cooper' },
              { text: 'Cody Fisher', value: 'Cody Fisher' },
              { text: 'Esther Howard', value: 'Esther Howard' },
              { text: 'Kristin Watson', value: 'Kristin Watson' },
              { text: 'Cameron Williamson', value: 'Cameron Williamson' },
            ],
            onFilter: (key, value) => handleFilter(key, value as string[]),
          },
          {
            title: 'Title',
            field: 'title',
          },
          {
            title: 'Role',
            field: 'role',
            filters: [
              {
                text: 'Admin',
                value: 'Admin',
              },
              {
                text: 'Member',
                value: 'Member',
              },
              {
                text: 'Owner',
                value: 'Owner',
              },
            ],
            onFilter: (key, value) => handleFilter(key, value as string[]),
          },
          {
            title: 'Email',
            field: 'email',
          },
        ]}
      />
    );
  },
};

export const WithSorter: Story = {
  render: () => {
    const [dataState, setDataState] = useState<User[]>(data);
    const [sortDirection, setSortDirection] = useState<{
      [key in keyof User]?: SortOrder | null;
    }>({
      id: null,
    });

    const handleSort = (field: keyof User, order: SortOrder | null) => {
      setSortDirection((prev) => ({
        ...prev,
        [field]: order,
      }));

      if (!order) {
        setDataState(data);
        return;
      }

      const sortedData = [...dataState].sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];

        if (aValue < bValue) return order === 'ascend' ? -1 : 1;
        if (aValue > bValue) return order === 'ascend' ? 1 : -1;
        return 0;
      });

      setDataState(sortedData);
    };

    return (
      <Table
        data={dataState}
        columns={[
          {
            title: 'ID',
            field: 'id',
            className: 'w-20',
            sortDirection: sortDirection['id'],
            onSort: (key, value) => handleSort(key, value),
          },
          {
            title: 'Name',
            field: 'name',
            sortDirection: sortDirection['name'],
            onSort: (key, value) => handleSort(key, value),
          },
          {
            title: 'Title',
            field: 'title',
            sortDirection: sortDirection['title'],
            onSort: (key, value) => handleSort(key, value),
          },
          {
            title: 'Role',
            field: 'role',
            sortDirection: sortDirection['role'],
          },
          {
            title: 'Email',
            field: 'email',
            sortDirection: sortDirection['email'],
          },
        ]}
      />
    );
  },
};
