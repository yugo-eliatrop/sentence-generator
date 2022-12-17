export const keypress = async (): Promise<{ exitPressed: boolean }> => {
  process.stdin.setRawMode(true);
  return new Promise(resolve =>
    process.stdin.once('data', data => {
      const byteArray = [...data];
      if (byteArray.length > 0 && byteArray[0] === 3) {
        resolve({ exitPressed: true });
      }
      process.stdin.setRawMode(false);
      resolve({ exitPressed: false });
    })
  );
};
