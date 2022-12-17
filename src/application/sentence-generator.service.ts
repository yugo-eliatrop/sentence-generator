import { flow, pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import * as A from 'fp-ts/lib/ReadonlyNonEmptyArray';
import * as S from 'fp-ts/lib/string';

import { Group, Templates, TemplateSymbol } from '../domain/types';
import { randomElem } from '../funcs.util';

export class SentenceGeneratorService {
  public templates: O.Option<Templates> = O.none;
  public groups: O.Option<Group[]> = O.none;

  public genNext(): O.Option<string> {
    return pipe(
      O.Do,
      O.bind('group', () => this.randomGroup()),
      O.bind('template', ({ group }) => this.templateByGroup(group)),
      O.map(x => this.mapTemplateIntoSentence(x))
    );
  }

  private randomGroup(): O.Option<Group> {
    return pipe(this.groups, O.map(randomElem));
  }

  private templateByGroup(group: Group): O.Option<string> {
    return pipe(
      this.templates,
      O.map(templates =>
        group.suitableTemplates === 'all'
          ? randomElem(Object.values(templates))
          : templates[randomElem(group.suitableTemplates)]
      )
    );
  }

  private mapTemplateIntoSentence({ template, group }: { template: string; group: Group }): string {
    const mapTemplateItemToWord = flow(S.split('|'), randomElem, this.wordByTemplateSymbol(group));
    return pipe(template, S.split(' '), A.map(mapTemplateItemToWord), res => res.join(' '), this.beautifySentence);
  }

  private wordByTemplateSymbol(group: Group) {
    return (textSymbol: TemplateSymbol | string) => {
      switch (textSymbol) {
        case '{V}':
          return randomElem(group.verbs).v;
        case '{Vs}':
          return randomElem(group.verbs).vs;
        case '{Ved}':
          return randomElem(group.verbs).ved;
        case '{N}':
          return randomElem(group.nouns);
        case '{ad}':
          return randomElem(group.additions);
        default:
          return textSymbol;
      }
    };
  }

  private beautifySentence(text: string) {
    const trimmed = text.replace(/\s{2,}/, ' ').replace(/^\s|\s$/, '');
    return trimmed[0].toUpperCase() + trimmed.slice(1);
  }
}
