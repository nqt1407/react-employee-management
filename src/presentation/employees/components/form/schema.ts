import { z, ZodIssueCode } from "zod";
import { t } from "i18next";

const toolsSchema = z.array(
  z
    .object({
      id: z.number().optional(),
      toolLanguageResourceId: z.number({
        required_error: "Tool/Language is required",
      }),
      from: z.number().optional(),
      to: z.number().optional(),
      description: z.string().optional(),
      images: z
        .any()
        .array()
        .max(2, { message: "You can upload up to 2 images" })
        .refine(
          (files) => files.every((file) => file.type.startsWith("image/")),
          {
            message: "All files must be images",
          }
        )
        .optional(),
    })
    .superRefine((data, ctx) => {
      const { from, to } = data;
      if (from && to) {
        if (from > to) {
          ctx.addIssue({
            code: ZodIssueCode.custom,
            message: t("employee.form.input.toolExperienceFrom.afterToTime"),
            path: ["from"],
          });
        }

        if (to < from) {
          ctx.addIssue({
            code: ZodIssueCode.custom,
            message: t("employee.form.input.toolExperienceTo.beforeFromTime"),
            path: ["to"],
          });
        }
      }

      return z.NEVER;
    })
);

const positionsSchema = z.array(
  z.object({
    id: z.number().optional(),
    positionResourceId: z.number({
      required_error: t("employee.form.input.position.required"),
    }),
    toolLanguages: toolsSchema,
  })
);

export const employeeSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, t("employee.form.input.name.required")),
  positions: positionsSchema,
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
