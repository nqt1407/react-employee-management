import { departmentsHandlers } from './departments';
import { employeesHandlers } from './employees';
import { positionResourceHandlers } from './position-resources';

export const handlers = [
  ...employeesHandlers,
  ...departmentsHandlers,
  ...positionResourceHandlers,
];
