import { readFile as asyncReadFile } from 'fs/promises';

import { IDataReader } from '../application/interfaces';
import { Group, Templates } from '../domain/types';

const createDataReader = (): IDataReader => {
  const readFile = async <T>(path: string): Promise<T> => {
    return JSON.parse(await asyncReadFile(path, { encoding: 'utf-8' })) as T;
  };

  const readTemplates = async (path: string) => await readFile<Templates>(path);
  const readWordGroups = async (path: string) => await readFile<Group[]>(path);

  return { readTemplates, readWordGroups };
};

export const dataReader = createDataReader();
