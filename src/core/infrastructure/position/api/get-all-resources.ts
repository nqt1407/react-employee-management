import axios from 'axios';

import { PositionResourceResponse } from '@/types/api/get-position-resources';

export const getPositionResources =
  async (): Promise<PositionResourceResponse> => {
    return axios.get('/position-resources');
  };
