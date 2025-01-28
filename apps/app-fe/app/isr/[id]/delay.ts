export const delay = (waitSeconds: number): Promise<void> =>
  new Promise((res) => setTimeout(() => res(), waitSeconds * 1000));
