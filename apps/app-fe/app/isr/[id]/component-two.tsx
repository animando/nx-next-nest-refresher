import { delay } from './delay';

const ComponentTwo = async () => {
  await delay(5);
  return <p>Lazy-loaded without suspense</p>;
};

export default ComponentTwo;
