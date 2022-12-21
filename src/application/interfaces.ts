import * as TE from 'fp-ts/lib/TaskEither';

import { Group, Templates } from '../domain';

export interface IDataReader {
  readTemplates: (path: string) => TE.TaskEither<Error, Templates>;
  readWordGroups: (path: string) => TE.TaskEither<Error, Group[]>;
}
