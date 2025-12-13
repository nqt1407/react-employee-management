import { HttpResponse, http } from 'msw';

import { env } from '@/config';

import { db } from '../db';

export const positionResourceHandlers = [
  http.get(`${env.API_URL}/position-resources`, async () => {
    const allPositions = db.position
      .getAll()
      .map(({ positionResourceId, name }) => {
        const toolLangs = db.toolLanguage.findMany({
          where: {
            positionResourceId: {
              equals: positionResourceId,
            },
          },
        });

        return {
          positionResourceId: positionResourceId,
          name: name,
          toolLanguageResources: toolLangs.map(
            ({ name, positionResourceId, toolLanguageResourceId }) => ({
              name,
              positionResourceId,
              toolLanguageResourceId,
            }),
          ),
        };
      });

    return HttpResponse.json(
      { success: true, data: allPositions },
      { status: 200 },
    );
  }),
];
