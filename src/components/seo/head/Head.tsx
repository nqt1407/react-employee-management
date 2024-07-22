import { Helmet, HelmetProps, HelmetData } from 'react-helmet-async';

type HeadProps = HelmetProps & {
  description?: string;
  children?: React.ReactNode;
};

export const DEFAULT_TITLE = 'Employees Management';

//* For usage without context
const helmetData = new HelmetData({});

//* Please change the title prefix and default Title fit with your application
export const Head = ({ description, children, title, ...props }: HeadProps) => (
  <Helmet
    {...props}
    title={title ? `${DEFAULT_TITLE} | ${title}` : undefined}
    helmetData={helmetData}
    defaultTitle={DEFAULT_TITLE}
  >
    <meta name="description" content={description} />
    {children}
  </Helmet>
);
