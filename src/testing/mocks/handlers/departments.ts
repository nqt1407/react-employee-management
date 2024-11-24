import { HttpResponse, http } from 'msw';

import { env } from '@/config';

import { db } from '../db';

export const departmentsHandlers = [
  http.get(`${env.API_URL}/departments`, async () => {
    try {
      const allDepartments = db.department.getAll();
      return HttpResponse.json(allDepartments);
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        {
          status: 500,
          type: 'error',
        },
      );
    }
  }),
];
