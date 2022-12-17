import { Group, Templates } from '../domain/types';

export interface IDataReader {
  readTemplates: (path: string) => Promise<Templates>;
  readWordGroups: (path: string) => Promise<Group[]>;
}
