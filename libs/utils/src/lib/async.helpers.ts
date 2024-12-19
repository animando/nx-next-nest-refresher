export const delay = (millis: number) =>
  new Promise((res) => setTimeout(res, millis));
