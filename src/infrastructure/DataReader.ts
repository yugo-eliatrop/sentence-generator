import * as E from 'fp-ts/lib/Either';
import { flow, pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import { readFile as asyncReadFile } from 'fs/promises';
import * as t from 'io-ts';
import { PathReporter } from 'io-ts/PathReporter';

import { IDataReader } from '../application/interfaces';
import { isValidGroups, isValidTemplates } from '../domain/types';

const createDataReader = (): IDataReader => {
  const readFile = (path: string): TE.TaskEither<Error, unknown> => {
    return pipe(
      TE.tryCatch(
        () => asyncReadFile(path, { encoding: 'utf-8' }),
        e => new Error(`File reading error: ${e}`)
      ),
      TE.map(JSON.parse)
    );
  };

  const validateData =
    <T>(validationFunc: (v: unknown) => t.Validation<T>) =>
    (fileData: TE.TaskEither<Error, unknown>) => {
      return pipe(
        fileData,
        TE.chain(
          flow(
            validationFunc,
            E.mapLeft(flow(E.left, PathReporter.report, errors => new Error(errors.join('\n')))),
            TE.fromEither
          )
        )
      );
    };

  const readTemplates = flow(readFile, validateData(isValidTemplates));

  const readWordGroups = flow(readFile, validateData(isValidGroups));

  return { readTemplates, readWordGroups };
};

export const dataReader = createDataReader();
