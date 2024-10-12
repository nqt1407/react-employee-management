import { t } from 'i18next';
import { z } from 'zod';

export const employeeSchema = z.object({
  name: z.string().min(1, t('employee.form.input.name.required')),
  dob: z.string().min(1, 'Date of birth is required'),
  email: z.string().min(1, 'Email is required'),
  phone: z.string().min(1, 'Phone is required'),
  departmentId: z.string().min(1, 'Department is required'),
  positionId: z.string().min(1, 'Position is required'),
  dateOfJoin: z.string().min(1, 'Date of Joining is required'),
  description: z.string().optional(),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
