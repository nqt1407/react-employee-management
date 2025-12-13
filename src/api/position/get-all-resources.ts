import axios from 'axios';

import { PositionResourceResponse } from '@/types/api/get-position-resources';

export const getPositionResources = async () => {
  const res = await axios.get<PositionResourceResponse>('/position-resources');
  return res.data;
};
