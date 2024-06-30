import { Option } from '@/components/forms/select';
import { Employee, EmployeePosition } from '@/core/domain/entities/employee';
import { PositionResource } from '@/core/domain/entities/position';
import { base64ToFile } from '@/utils/file';

import { EmployeeFormValues } from '../components/form/schema';

const transformPositionResourceData = (posRes: PositionResource[] = []) => {
  const posResOptions: Option[] = [];
  const posResMap = new Map<number, Option[]>();

  for (const { positionResourceId, name, toolLanguageResources } of posRes) {
    posResOptions.push({ key: name, value: positionResourceId });

    posResMap.set(
      positionResourceId,
      toolLanguageResources.map(({ toolLanguageResourceId, name }) => ({
        key: name,
        value: toolLanguageResourceId,
      })),
    );
  }

  return { posResOptions, posResMap };
};

const makePositionMap = (posRes: PositionResource[] = []) => {
  const posMap = new Map<number, string>();

  for (const { positionResourceId, name } of posRes) {
    posMap.set(positionResourceId, name);
  }

  return posMap;
};

const mappingFormValuesToEntity = (
  formValues: EmployeeFormValues,
): Employee => {
  const positions: EmployeePosition[] = formValues.positions.map(
    (pos, posIdx) => ({
      ...pos,
      displayOrder: posIdx,
      toolLanguages: pos.toolLanguages.map((tool, toolIdx) => ({
        ...tool,
        displayOrder: toolIdx,
        images: tool.images?.map((img, imgIdx) => ({
          data: img as File,
          displayOrder: imgIdx,
        })),
      })),
    }),
  );

  return {
    id: formValues.id,
    name: formValues.name,
    positions,
  } as Employee;
};

const mappingEmployeeDataToFormValues = (
  employee: Employee,
): EmployeeFormValues => {
  const positions = employee.positions?.map((pos) => ({
    ...pos,
    toolLanguages: pos.toolLanguages?.map((tool) => ({
      ...tool,
      images: tool.images?.map((img, index) => {
        return img.cdnUrl
          ? base64ToFile(img.cdnUrl, `employee-image-${index}.png`, `image/png`)
          : null;
      }),
    })),
  }));

  return {
    id: employee.id,
    name: employee.name,
    positions,
  };
};

const calculateTotalExperience = (positions: EmployeePosition[]): number => {
  const years = positions
    .flatMap((position) => position.toolLanguages)
    .reduce((acc: number[], { from, to }) => {
      if (from) acc.push(from);
      if (to) acc.push(to);
      return acc;
    }, []);

  if (years.length === 0) return 0;

  const uniqueArr = Array.from(new Set(years)).sort();

  const maxYear = Math.max(...uniqueArr);
  const minYear = Math.min(...uniqueArr);

  if (maxYear === minYear) {
    const currentYear = new Date().getFullYear();
    return currentYear - minYear;
  }

  return maxYear - minYear;
};

const getAllImages = (positions: EmployeePosition[]): File[] => {
  const files = positions.flatMap((position) =>
    position.toolLanguages.flatMap(
      (toolLanguage) =>
        toolLanguage.images?.map((image, idx) => {
          if (!image.cdnUrl) return null;
          return {
            file: base64ToFile(image.cdnUrl, `image_${idx}.png`, 'image/png'),
            displayOrder: image.displayOrder ?? 0,
          };
        }) ?? [],
    ),
  );

  return files
    .filter(
      (fileData): fileData is { file: File; displayOrder: number } =>
        fileData !== null,
    )
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((fileData) => fileData.file);
};

export {
  transformPositionResourceData,
  mappingFormValuesToEntity,
  makePositionMap,
  calculateTotalExperience,
  mappingEmployeeDataToFormValues,
  getAllImages,
};
