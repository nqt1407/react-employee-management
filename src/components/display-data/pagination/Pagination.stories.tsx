import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Display Data/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page: number) => {
      setCurrentPage(page);
    };

    return (
      <Pagination
        onPageChange={onPageChange}
        totalCount={100}
        siblingCount={1}
        currentPage={currentPage}
        pageSize={10}
      />
    );
  },
};

export const MultiplePages: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page: number) => {
      setCurrentPage(page);
    };

    return (
      <Pagination
        onPageChange={onPageChange}
        totalCount={250}
        siblingCount={2}
        currentPage={currentPage}
        pageSize={10}
      />
    );
  },
};

export const FewPages: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page: number) => {
      setCurrentPage(page);
    };

    return (
      <Pagination
        onPageChange={onPageChange}
        totalCount={30}
        siblingCount={1}
        currentPage={currentPage}
        pageSize={10}
      />
    );
  },
};
