'use server';

export async function doServerAction(oldCount: number) {
  return Promise.resolve(oldCount + 1);
}
