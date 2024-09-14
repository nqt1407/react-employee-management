import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Table } from './Table';
import { RowSelectionModel } from './types';

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
  id: string;
  createdAt: number;
  name: string;
  title: string;
  role: string;
  email: string;
};

type Story = StoryObj<typeof Table<User>>;

const data: User[] = [
  {
    id: '1',
    createdAt: Date.now(),
    name: 'Jane Cooper',
    title: 'Regional Paradigm Technician',
    role: 'Admin',
    email: 'jane.cooper@example.com',
  },
  {
    id: '2',
    createdAt: Date.now(),
    name: 'Cody Fisher',
    title: 'Product Directives Officer',
    role: 'Owner',
    email: 'cody.fisher@example.com',
  },
];

export const Default: Story = {
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
