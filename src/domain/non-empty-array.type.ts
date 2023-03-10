import { isNonEmpty } from 'fp-ts/lib/Array';
import { chain } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import { fromArray, map, NonEmptyArray } from 'fp-ts/lib/NonEmptyArray';
import { isNone } from 'fp-ts/lib/Option';
import * as t from 'io-ts';

export type NonEmptyArrayC<C extends t.Mixed> = t.Type<
  NonEmptyArray<t.TypeOf<C>>,
  NonEmptyArray<t.OutputOf<C>>,
  unknown
>;

export const nonEmptyArray = <C extends t.Mixed>(
  codec: C,
  name = `NonEmptyArray<${codec.name}>`
): NonEmptyArrayC<C> => {
  const arr = t.array(codec);
  return new t.Type(
    name,
    (u): u is NonEmptyArray<t.TypeOf<C>> => arr.is(u) && isNonEmpty(u),
    (u, c) =>
      pipe(
        arr.validate(u, c),
        chain(as => {
          const onea = fromArray(as);
          return isNone(onea) ? t.failure(u, c) : t.success(onea.value);
        })
      ),
    map(codec.encode)
  );
};
