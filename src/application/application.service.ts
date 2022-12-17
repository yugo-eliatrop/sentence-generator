import * as O from 'fp-ts/lib/Option';

import { IDataReader } from './interfaces';
import { SentenceGeneratorService } from './sentence-generator.service';

export class ApplicationService {
  constructor(
    private readonly dataReader: IDataReader,
    private readonly sentenceGeneratorService: SentenceGeneratorService
  ) {}

  public async prepareData(templatesPath: string, wordGroupsPath: string) {
    const templates = await this.dataReader.readTemplates(templatesPath);
    const groups = await this.dataReader.readWordGroups(wordGroupsPath);
    this.sentenceGeneratorService.templates = O.fromNullable(templates);
    this.sentenceGeneratorService.groups = O.fromNullable(groups);
  }

  public genNextSentence() {
    return this.sentenceGeneratorService.genNext();
  }
}
