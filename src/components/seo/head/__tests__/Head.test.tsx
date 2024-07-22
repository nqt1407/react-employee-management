import { render, waitFor } from '@/testing/test-utils';

import { Head, DEFAULT_TITLE } from '../Head';

describe('Head Component', () => {
  test('should add proper page title and meta description', async () => {
    const title = 'Hello World';
    const titleSuffix = `${DEFAULT_TITLE} | `;
    const description = 'This is a description';

    render(<Head title={title} description={description} />);
    await waitFor(() => expect(document.title).toEqual(titleSuffix + title));

    const metaDescription = document.querySelector("meta[name='description']");

    expect(metaDescription?.getAttribute('content')).toEqual(description);
  });
});
