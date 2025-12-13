import { HttpResponse, http } from 'msw';

import { env } from '@/config';

import { db } from '../db';

export const departmentsHandlers = [
  http.get(`${env.API_URL}/departments`, async () => {
    try {
      const allDepartments = db.departments.getAll();
      return HttpResponse.json({ success: true, data: allDepartments });
    } catch (error: any) {
      return HttpResponse.json({
        success: false,
        error: error?.message || 'Server Error',
      });
    }
  }),
];
