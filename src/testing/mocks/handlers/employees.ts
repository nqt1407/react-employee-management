import { HttpResponse, http } from "msw";

import { env } from "@/config";
import { CreateEmployeeDTO } from "@/types/api/create-employee";
import { EmployeeDTO } from "@/types/api/employee";
import { UpdateEmployeeDTO } from "@/types/api/update-employee";
import { fileToBase64 } from "@/utils/file";

import { db, persistDb } from "../db";
import { convertFormDataToJson } from "../utils";

export const employeesHandlers = [
  // Get all employees
  http.get(`${env.API_URL}/employees`, async ({ request }) => {
    try {
      const url = new URL(request.url);
      const name = url.searchParams.get("search") || "";
      const pageNumber = Number(url.searchParams.get("pageNumber")) || 1;
      const pageSize = Number(url.searchParams.get("pageSize")) || 10;

      const offset = (pageNumber - 1) * pageSize;

      const whereClause: any = name
        ? { where: { name: { equals: name } } }
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

      const employees: EmployeeDTO[] = [];

      for (const emp of allEmployees) {
        const { id: employeeId } = emp;

        // Fetch positions for the current employee
        const positions = db.employeePosition.findMany({
          where: { employeeId: { equals: employeeId } },
        });

        // Fetch tool languages for each position
        const positionsWithToolLanguages = positions.map((position) => {
          const findToolLanguages = db.employeeToolLanguage.findMany({
            where: {
              positionId: { equals: position.id },
              employeeId: { equals: employeeId },
            },
          });

          const toolLanguages = findToolLanguages.map((tool) => {
            const images = db.employeeToolLanguageImage.findMany({
              where: {
                toolLanguageId: { equals: tool.id },
                employeeId: { equals: employeeId },
              },
            });

            return {
              ...tool,
              images,
            };
          });

          return { ...position, toolLanguages };
        });

        employees.push({
          ...emp,
          positions: positionsWithToolLanguages,
        });
      }

      const totalPages = Math.ceil(totalItems / pageSize);
      const hasNextPage = pageNumber < totalPages;
      const nextPage = hasNextPage ? pageNumber + 1 : null;

      return HttpResponse.json({
        totalItems,
        totalPages,
        nextPage,
        pageItems: employees,
      });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || "Server Error" },
        {
          status: 500,
          type: "error",
        }
      );
    }
  }),

  // Get a specific employee by ID
  http.get(`${env.API_URL}/employee/:id`, async ({ params }) => {
    try {
      const { id } = params;
      if (!id) {
        return HttpResponse.json(
          { message: "Invalid request data" },
          { status: 400, type: "error" }
        );
      }

      const existingEmployee = db.employee.findFirst({
        where: { id: { equals: Number(id) } },
      });

      if (!existingEmployee) {
        return HttpResponse.json(
          { message: "Employee not found" },
          { status: 404, type: "error" }
        );
      }

      const positions = db.employeePosition.findMany({
        where: { employeeId: { equals: existingEmployee.id } },
      });

      const positionsWithToolLanguages = positions.map((position) => {
        const findToolLanguages = db.employeeToolLanguage.findMany({
          where: {
            positionId: { equals: position.id },
            employeeId: { equals: existingEmployee.id },
          },
        });

        const toolLanguages = findToolLanguages.map((tool) => {
          const images = db.employeeToolLanguageImage.findMany({
            where: {
              toolLanguageId: { equals: tool.id },
              employeeId: { equals: existingEmployee.id },
            },
          });

          return {
            ...tool,
            images,
          };
        });

        return { ...position, toolLanguages };
      });

      const employeeWithRelations = {
        ...existingEmployee,
        positions: positionsWithToolLanguages,
      };

      return HttpResponse.json(employeeWithRelations);
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || "Server Error" },
        {
          status: 500,
          type: "error",
        }
      );
    }
  }),

  // Create a new employee
  http.post(`${env.API_URL}/employee`, async ({ request }) => {
    try {
      const employeeRequest = await request.formData();
      const { name, positions } = convertFormDataToJson(
        employeeRequest
      ) as CreateEmployeeDTO;

      if (!name || !Array.isArray(positions)) {
        return HttpResponse.json(
          { message: "Invalid request data" },
          { status: 400, type: "error" }
        );
      }

      const newEmployee = db.employee.create({
        name,
      });

      for (const {
        positionResourceId,
        displayOrder,
        toolLanguages,
      } of positions) {
        const newPosition = db.employeePosition.create({
          employeeId: Number(newEmployee.id),
          positionResourceId: Number(positionResourceId),
          displayOrder: Number(displayOrder),
        });

        for (const {
          toolLanguageResourceId,
          from,
          to,
          description,
          displayOrder,
          images,
        } of toolLanguages) {
          const newTools = db.employeeToolLanguage.create({
            positionId: Number(newPosition.id),
            employeeId: Number(newEmployee.id),
            toolLanguageResourceId: Number(toolLanguageResourceId),
            from: Number(from),
            to: Number(to),
            description,
            displayOrder: Number(displayOrder),
          });

          for (const { displayOrder, data } of images || []) {
            if (!data) continue;
            const strImg = await fileToBase64(data);
            db.employeeToolLanguageImage.create({
              toolLanguageId: Number(newTools.id),
              employeeId: Number(newEmployee.id),
              cdnUrl: strImg,
              displayOrder: Number(displayOrder),
            });
          }
        }
      }

      await persistDb("employeeToolLanguageImage");
      await persistDb("employeeToolLanguage");
      await persistDb("employeePosition");
      await persistDb("employee");

      return HttpResponse.json(
        { message: "Employee created successfully" },
        { status: 200 }
      );
    } catch (error: any) {
      console.error("Error creating employee:", error);
      return HttpResponse.json(
        { message: error?.message || "Server Error" },
        { status: 500, type: "error" }
      );
    }
  }),

  // Update an existing employee
  http.put(`${env.API_URL}/employee/:id`, async ({ request, params }) => {
    try {
      const employeeRequest = await request.formData();
      const { name, positions } = convertFormDataToJson(
        employeeRequest
      ) as UpdateEmployeeDTO;

      const { id } = params;

      if (!id || !name || !Array.isArray(positions)) {
        return HttpResponse.json(
          { message: "Invalid request data" },
          { status: 400, type: "error" }
        );
      }

      const existingEmployee = db.employee.findFirst({
        where: { id: { equals: Number(id) } },
      });

      if (!existingEmployee) {
        return HttpResponse.json(
          { message: "Employee not found" },
          { status: 404, type: "error" }
        );
      }

      // Remove all related employee position
      db.employeePosition.deleteMany({
        where: { employeeId: { equals: existingEmployee.id } },
      });

      // Remove all related employee tool language
      db.employeeToolLanguage.deleteMany({
        where: { employeeId: { equals: existingEmployee.id } },
      });

      for (const {
        id,
        positionResourceId,
        displayOrder,
        toolLanguages,
      } of positions) {
        const newPosition = db.employeePosition.create({
          id: Number(id),
          employeeId: existingEmployee.id,
          positionResourceId: Number(positionResourceId),
          displayOrder: Number(displayOrder),
        });

        for (const {
          id,
          toolLanguageResourceId,
          from,
          to,
          description,
          displayOrder,
          images,
        } of toolLanguages) {
          const updateTools = db.employeeToolLanguage.create({
            id: Number(id),
            positionId: Number(newPosition.id),
            employeeId: Number(existingEmployee.id),
            toolLanguageResourceId: Number(toolLanguageResourceId),
            from: Number(from),
            to: Number(to),
            description,
            displayOrder: Number(displayOrder),
          });

          if (images) {
            for (const { id, displayOrder, data } of images) {
              if (!data) continue;
              const strImg = await fileToBase64(data);
              db.employeeToolLanguageImage.create({
                id: Number(id),
                toolLanguageId: Number(updateTools.id),
                employeeId: Number(existingEmployee.id),
                cdnUrl: strImg,
                displayOrder: Number(displayOrder),
              });
            }
          }
        }
      }

      db.employee.update({
        where: { id: { equals: Number(id) } },
        data: { name },
      });

      await persistDb("employeeToolLanguageImage");
      await persistDb("employeeToolLanguage");
      await persistDb("employeePosition");
      await persistDb("employee");

      return HttpResponse.json(
        { message: "Employee updated successfully" },
        { status: 200 }
      );
    } catch (error: any) {
      console.error("Error updating employee:", error);
      return HttpResponse.json(
        { message: error?.message || "Server Error" },
        { status: 500, type: "error" }
      );
    }
  }),

  // Delete an employee
  http.delete(`${env.API_URL}/employee/:id`, async ({ params }) => {
    try {
      const { id } = params;
      if (!id) {
        return HttpResponse.json(
          { message: "Invalid request data" },
          { status: 400, type: "error" }
        );
      }

      db.employee.delete({
        where: { id: { equals: Number(id) } },
      });
      await persistDb("employee");

      db.employeePosition.deleteMany({
        where: { employeeId: { equals: Number(id) } },
      });
      await persistDb("employeePosition");

      db.employeeToolLanguage.deleteMany({
        where: {
          employeeId: {
            equals: Number(id),
          },
        },
      });
      await persistDb("employeeToolLanguage");

      db.employeeToolLanguageImage.deleteMany({
        where: {
          employeeId: {
            equals: Number(id),
          },
        },
      });
      await persistDb("employeeToolLanguageImage");

      return HttpResponse.json(
        { message: "Employee deleted successfully" },
        { status: 200 }
      );
    } catch (error: any) {
      console.error("Error deleting employee:", error);
      return HttpResponse.json(
        { message: error?.message || "Server Error" },
        { status: 500, type: "error" }
      );
    }
  }),
];
