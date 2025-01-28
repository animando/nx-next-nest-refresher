import { delay } from './delay';
import { DynamicParent } from './dynamic-parent';

const ComponentOne = async () => {
  await delay(3);
  return (
    <>
      <p>Lazy-loaded with suspense</p>
      <DynamicParent />
    </>
  );
};

export default ComponentOne;
