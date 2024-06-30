import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import {
  useForm,
  UseFormReturn,
  SubmitHandler,
  UseFormProps,
  FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form';
import { ZodType, z } from 'zod';

export type FormProps<TFormValues extends FieldValues, Schema> = {
  /**
   * Class name of the form
   */
  className?: string;
  /**
   * Callback fired when submit
   */
  onSubmit: SubmitHandler<TFormValues>;
  /**
   * Content of the form
   */
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  /**
   * Optional configuration of `react-hook-form`
   */
  options?: UseFormProps<TFormValues>;
  /**
   * Id of the form
   */
  id?: string;
  /**
   * Label display text.
   */
  schema?: Schema;
  /**
   * Label display text.
   */
  disabledBrowserValidate?: boolean;
  /**
   * Stylesheet apply for a form
   */
  style?: React.CSSProperties;
};

const Form = <
  Schema extends ZodType<any, any, any>,
  TFormValues extends FieldValues = z.infer<Schema>,
>(
  props: FormProps<TFormValues, Schema>,
) => {
  const { onSubmit, children, className, options, id, schema, style } = props;
  const methods = useForm<TFormValues>({
    ...options,
    resolver: schema && zodResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <form
        className={clsx('space-y-6', className)}
        onSubmit={methods.handleSubmit(onSubmit)}
        id={id}
        noValidate={!!props.disabledBrowserValidate}
        style={style}
      >
        {children(methods)}
      </form>
    </FormProvider>
  );
};

type ConnectFormProps<TFormValues extends FieldValues> = {
  /**
   * Content of the sub-form
   */
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
};

const ConnectForm = <
  Schema extends ZodType<any, any, any>,
  TFormValues extends FieldValues = z.infer<Schema>,
>({
  children,
}: ConnectFormProps<TFormValues>) => {
  const methods = useFormContext<TFormValues>();

  return children({ ...methods });
};

export { Form, ConnectForm };
