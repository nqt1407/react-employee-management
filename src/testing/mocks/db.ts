import { factory, primaryKey } from '@mswjs/data';

import { env } from '@/config';
import storage from '@/utils/storage';

const DB_STORAGE_KEY = 'db';
const ID_STORAGE_KEY = 'id_states';
const INIT_DB_FILE_PATH = '/init-data.json';

const loadIdStates = () => {
  const idStatesFromStorage = storage.get(ID_STORAGE_KEY);
  if (idStatesFromStorage) {
    try {
      return JSON.parse(idStatesFromStorage);
    } catch (error) {
      console.error('Error parsing ID states from storage:', error);
      return {};
    }
  }
  return {};
};

const saveIdStates = (idStates: Record<string, number>) => {
  storage.set(ID_STORAGE_KEY, JSON.stringify(idStates));
};

const idStates = loadIdStates();

const createIdGenerator = (key: string, initialId = 1) => {
  let id = idStates[key] || initialId;
  return () => {
    idStates[key] = id;
    saveIdStates(idStates);
    return id++;
  };
};

const idGenerators = {
  employee: createIdGenerator('employeeId', 1),
  employeePosition: createIdGenerator('employeePositionId', 1),
  employeeToolLanguage: createIdGenerator('employeeToolLanguageId', 1),
  employeeToolLanguageImage: createIdGenerator(
    'employeeToolLanguageImageId',
    1,
  ),
  department: createIdGenerator('departmentId', 1),
  position: createIdGenerator('positionId', 1),
  toolLanguage: createIdGenerator('toolLanguageId', 1),
};

const dbModels = {
  employee: {
    id: primaryKey(idGenerators.employee),
    name: String,
  },
  employeePosition: {
    id: primaryKey(idGenerators.employeePosition),
    employeeId: Number,
    positionResourceId: Number,
    displayOrder: Number,
  },
  employeeToolLanguage: {
    id: primaryKey(idGenerators.employeeToolLanguage),
    positionId: Number,
    employeeId: Number,
    toolLanguageResourceId: Number,
    description: String,
    from: Number,
    to: Number,
    displayOrder: Number,
  },
  employeeToolLanguageImage: {
    id: primaryKey(idGenerators.employeeToolLanguageImage),
    toolLanguageId: Number,
    employeeId: Number,
    displayOrder: Number,
    cdnUrl: String,
  },
  departments: {
    id: primaryKey(idGenerators.department),
    name: String,
  },
  position: {
    id: primaryKey(idGenerators.position),
    name: String,
    positionResourceId: Number,
  },
  toolLanguage: {
    id: primaryKey(idGenerators.toolLanguage),
    name: String,
    toolLanguageResourceId: Number,
    positionResourceId: Number,
  },
};

export const db = factory(dbModels);

export type DbModel = keyof typeof dbModels;

const persistId = () => {
  const newIdStates: Record<string, number> = {};
  for (const key of Object.keys(db) as DbModel[]) {
    const entries = db[key].getAll();
    if (entries.length > 0) {
      const maxId = Math.max(...entries.map((entry: any) => entry.id));
      newIdStates[`${key}Id`] = maxId + 1;
    }
  }
  saveIdStates(newIdStates);
};

const loadDb = async () => {
  const dbFromStorage = storage.get(DB_STORAGE_KEY);

  if (dbFromStorage) {
    try {
      return JSON.parse(dbFromStorage);
    } catch (error) {
      console.error('Error parsing DB from storage:', error);
      return {};
    }
  }

  try {
    const response = await fetch(INIT_DB_FILE_PATH);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    storage.set(DB_STORAGE_KEY, JSON.stringify(data));
    return data;
  } catch (error) {
    console.error('Error loading mocked DB:', error);
    return {};
  }
};

export const initDb = async () => {
  const dbFromStorage = await loadDb();
  Object.entries(db).forEach(([key, model]) => {
    const dbEntry = dbFromStorage[key];
    if (dbEntry) {
      dbEntry.forEach((entry: Record<string, any>) => {
        model.create(entry);
      });
    }
  });

  persistId();
};

export const persistDb = async (model: DbModel) => {
  if (env.MODE === 'test') return;
  const dbFromStorage = await loadDb();
  dbFromStorage[model] = db[model].getAll();
  storage.set(DB_STORAGE_KEY, JSON.stringify(dbFromStorage));
  persistId();
};

export const resetDb = () => {
  storage.removeAll();
};
