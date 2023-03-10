import { sequenceT } from 'fp-ts/lib/Apply';
import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';

import { IDataReader } from './interfaces';
import { SentenceGeneratorService } from './sentence-generator.service';

export class ApplicationService {
  constructor(
    private readonly dataReader: IDataReader,
    private readonly sentenceGeneratorService: SentenceGeneratorService
  ) {}

  public async prepareData(templatesPath: string, wordGroupsPath: string): Promise<O.Option<Error>> {
    const templates = await this.dataReader.readTemplates(templatesPath)();
    const groups = await this.dataReader.readWordGroups(wordGroupsPath)();
    this.sentenceGeneratorService.templates = O.fromEither(templates);
    this.sentenceGeneratorService.groups = O.fromEither(groups);
    return pipe(
      sequenceT(E.Apply)(templates, groups),
      E.fold(
        e => O.some(e),
        () => O.none
      )
    );
  }

  public genNextSentence() {
    return this.sentenceGeneratorService.genNext();
  }
}
