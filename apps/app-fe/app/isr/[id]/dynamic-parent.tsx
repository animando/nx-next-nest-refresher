'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const ComponentFour = dynamic(() => import('./component-four'), {
  loading: () => <p>Loading Four</p>,
});
const ComponentThree = dynamic(() => import('./component-three'), {
  loading: () => <p>Loading Three</p>,
});

export const DynamicParent = () => {
  const [showMore, setShowMore] = useState(false);
  return (
    <>
      <ComponentThree />
      {showMore && <ComponentFour />}
      <button onClick={() => setShowMore(!showMore)}>Toggle</button>
    </>
  );
};
