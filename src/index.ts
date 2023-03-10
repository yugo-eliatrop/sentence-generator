import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';

import { app } from './infrastructure';
import { keypress } from './stdin';

const round = (num: number) => Math.round(num * 10) / 10;

const main = async (): Promise<number> => {
  const initializationError = await app.prepareData('./data/templates.json', './data/groups.json');
  if (O.isSome(initializationError)) {
    process.stdout.write(`Initialization error% ${initializationError.value.message}`);
    return 1;
  }
  const startTime = new Date().getTime();
  let sentencesCount = 0;
  do {
    const sentence = app.genNextSentence();
    process.stdout.write(
      `> ${pipe(
        sentence,
        O.getOrElse(() => "Something went wrong: we don't have a sentence")
      )}\n`
    );
    sentencesCount++;
  } while (!(await keypress()).exitPressed);
  const secondsLeft = (new Date().getTime() - startTime) / 1000;
  process.stdout.write(
    `\nFinished. There were ${sentencesCount} sentences generated\nIt took you ${round(
      secondsLeft
    )} seconds to translate this in total or ${round(secondsLeft / sentencesCount)} seconds per sentence\n\n`
  );
  return 0;
};

main().then(process.exit);
