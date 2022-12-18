export type Templates = Record<string, string>;

export type TemplateSymbol = '{V}' | '{Vs}' | '{Ved}' | '{N}' | '{ad}' | '{Q}';

export type Verb = {
  v: string;
  vs: string;
  ved: string;
};

export type Group = {
  questions: string[];
  nouns: string[];
  verbs: Verb[];
  additions: string[];
  suitableTemplates: string[] | 'all';
};
