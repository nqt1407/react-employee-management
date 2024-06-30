import { z } from 'zod';

const toolsSchema = z.array(
  z
    .object({
      id: z.number().optional(),
      toolLanguageResourceId: z.number({
        required_error: 'Tool/Language is required',
      }),
      from: z.number().optional(),
      to: z.number().optional(),
      description: z.string().optional(),
      images: z
        .any()
        .array()
        .max(2, { message: 'You can upload up to 2 images' })
        .refine(
          (files) => files.every((file) => file.type.startsWith('image/')),
          {
            message: 'All files must be images',
          },
        )
        .optional(),
    })
    .refine(({ from, to }) => from && to && from < to, {
      message: 'From date can not be greater than To date',
      path: ['from'],
    }),
);

const positionsSchema = z.array(
  z.object({
    id: z.number().optional(),
    positionResourceId: z.number({
      required_error: 'Position is required',
    }),
    toolLanguages: toolsSchema,
  }),
);

export const employeeSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Name is required'),
  positions: positionsSchema,
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
