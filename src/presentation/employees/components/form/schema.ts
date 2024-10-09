import { t } from 'i18next';
import { z } from 'zod';

export const employeeSchema = z.object({
  name: z.string().min(1, t('employee.form.input.name.required')),
  email: z.string().min(1, 'Email is require'),
  phone: z.string().optional(),
  departmentId: z.string().min(1, 'Required'),
  positionId: z.string().min(1, 'Required'),
  hireDate: z.string().datetime(),
  description: z.string().optional(),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
