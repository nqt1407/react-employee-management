import { departmentsHandlers } from './departments';
import { employeesHandlers } from './employees';

export const handlers = [...employeesHandlers, ...departmentsHandlers];
