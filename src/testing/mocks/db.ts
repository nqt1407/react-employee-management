import { factory, primaryKey } from '@mswjs/data';
import { nanoid } from 'nanoid';

import { env } from '@/config';
import storage from '@/utils/storage';

const DB_STORAGE_KEY = 'db';
const INIT_DB_FILE_PATH = '/assets/init-data.json';

const dbModels = {
  employee: {
    id: primaryKey(nanoid),
    dob: String,
    name: String,
    email: String,
    phone: String,
    dateOfJoin: String,
    departmentId: String,
    positionId: String,
    updatedAt: () => new Date().toISOString(),
  },
  position: {
    id: primaryKey(nanoid),
    name: String,
  },
  department: {
    id: primaryKey(nanoid),
    name: String,
  },
};

export const db = factory(dbModels);

export type DbModel = keyof typeof dbModels;

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
};

export const persistDb = async (model: DbModel) => {
  if (env.MODE === 'test') return;
  const dbFromStorage = await loadDb();
  dbFromStorage[model] = db[model].getAll();
  storage.set(DB_STORAGE_KEY, JSON.stringify(dbFromStorage));
};

export const resetDb = () => {
  storage.removeAll();
};
