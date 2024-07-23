import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { DEFAULT_TITLE } from '../../../seo/head';
import { ContentLayout } from '../ContentLayout';

const renderComponent = (title: string, children: React.ReactNode) => {
  return render(<ContentLayout title={title}>{children}</ContentLayout>);
};

const titleSuffix = `${DEFAULT_TITLE} | `;

const testTitle = 'Test Title';

describe('ContentLayout', () => {
  it('renders the title', () => {
    renderComponent(testTitle, <div>Test Content</div>);
    expect(screen.getByText(testTitle)).toBeInTheDocument();
  });

  it('renders the children', () => {
    renderComponent(testTitle, <div>Test Content</div>);
    expect(screen.getByText(testTitle)).toBeInTheDocument();
  });

  it('renders the Head component with the correct title', async () => {
    renderComponent(testTitle, <div>Test Content</div>);
    await waitFor(() =>
      expect(document.title).toEqual(titleSuffix + testTitle),
    );
  });
});
