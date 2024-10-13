import { HttpResponse, http } from 'msw';

import { env } from '@/config';
import { CreateEmployeeRequest } from '@/types/api/create-employee';
import { Employee } from '@/types/api/employee';

import { db, persistDb } from '../db';

export const employeesHandlers = [
  // Get all employees
  http.get(`${env.API_URL}/employees`, async ({ request }) => {
    try {
      const url = new URL(request.url);
      const employeeName = url.searchParams.get('name') || '';
      const pageNumber = Number(url.searchParams.get('pageNumber')) || 1;
      const pageSize = Number(url.searchParams.get('pageSize')) || 10;
      const offset = (pageNumber - 1) * pageSize;

      const whereClause: any = employeeName
        ? { where: { name: { equals: employeeName } } }
        : {};

      const allEmployees = db.employee.findMany({
        ...whereClause,
        take: pageSize,
        skip: offset,
      });

      if (!allEmployees.length) {
        return HttpResponse.json({ pageItems: [] });
      }

      const totalItems = db.employee.count(whereClause);

      const employees: Employee[] = [];
      for (const employee of allEmployees) {
        const { departmentId, positionId, ...restAtt } = employee;

        const department = db.department.findFirst({
          where: { id: { equals: departmentId } },
        });

        const position = db.position.findFirst({
          where: { id: { equals: positionId } },
        });

        employees.push({
          ...restAtt,
          department: department?.name || '',
          position: position?.name || '',
        });
      }

      const totalPages = Math.ceil(totalItems / pageSize);
      const hasNextPage = pageNumber < totalPages;
      const nextPage = hasNextPage ? pageNumber + 1 : null;

      return HttpResponse.json({
        totalItems,
        totalPages,
        nextPage,
        items: allEmployees,
      });
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

  // Get a specific employee by ID
  http.get(`${env.API_URL}/employee/:id`, async ({ params }) => {
    try {
      const employeeId = params.id as string;
      if (!employeeId) {
        return HttpResponse.json(
          { message: 'Missing employee id' },
          { status: 400, type: 'error' },
        );
      }

      const foundEmployee = db.employee.findFirst({
        where: { id: { equals: employeeId } },
      });
      if (!foundEmployee) {
        return HttpResponse.json(
          { message: 'Employee not found' },
          { status: 404, type: 'error' },
        );
      }

      return HttpResponse.json(foundEmployee, { status: 200 });
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

  // Create a new employee
  http.post(`${env.API_URL}/employee`, async ({ request }) => {
    try {
      const data = (await request.json()) as CreateEmployeeRequest;
      db.employee.create({
        name: data.name,
        email: data.email,
        phone: data.name,
        departmentId: data.departmentId,
        positionId: data.positionId,
        dateOfJoin: data.dateOfJoin,
      });
      await persistDb('employee');
      return HttpResponse.json({ status: 201 });
    } catch (error: any) {
      console.error('Error when create employee:', error);
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500, type: 'error' },
      );
    }
  }),

  // Update an existing employee
  http.put(`${env.API_URL}/employee/:id`, async () => {
    try {
      // TODO
      return HttpResponse.json(200);
    } catch (error: any) {
      console.error('Error updating employee:', error);
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500, type: 'error' },
      );
    }
  }),

  // Delete an employee
  http.delete(`${env.API_URL}/employee/:id`, async ({ params }) => {
    try {
      // TODO
      const employeeId = params.id as string;
      if (!employeeId) {
        return HttpResponse.json(
          { message: 'Missing employee id' },
          { status: 400, type: 'error' },
        );
      }

      db.employee.delete({
        where: { id: { equals: employeeId } },
      });
      await persistDb('employee');
      return HttpResponse.json(200);
    } catch (error: any) {
      console.error('Error deleting employee:', error);
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500, type: 'error' },
      );
    }
  }),
];
