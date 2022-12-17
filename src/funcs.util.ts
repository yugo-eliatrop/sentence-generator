export const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomElem = <T>(arr: readonly T[]): T => {
  return arr[random(0, arr.length - 1)];
};
