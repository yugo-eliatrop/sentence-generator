import * as t from 'io-ts';

const TemplatesCodec = t.record(t.string, t.string);

export type Templates = t.TypeOf<typeof TemplatesCodec>;

export const isValidTemplates = TemplatesCodec.decode;

export type TemplateSymbol = '{V}' | '{Vs}' | '{Ved}' | '{N}' | '{ad}' | '{Q}';

const VerbCodec = t.type({
  v: t.string,
  vs: t.string,
  ved: t.string,
});

export type Verb = t.TypeOf<typeof VerbCodec>;

const GroupCodec = t.type({
  questions: t.array(t.string),
  nouns: t.array(t.string),
  verbs: t.array(VerbCodec),
  additions: t.array(t.string),
  suitableTemplates: t.union([t.literal('all'), t.array(t.string)]),
});

const GroupsCodec = t.array(GroupCodec);

export type Group = t.TypeOf<typeof GroupCodec>;

export const isValidGroups = GroupsCodec.decode;
