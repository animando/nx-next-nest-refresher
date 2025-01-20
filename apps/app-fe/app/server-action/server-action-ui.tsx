'use client';

import { Button } from '@nextui-org/react';
import { doServerAction } from './do-server-action';
import { useState } from 'react';

export const ServerAction = () => {
  const [count, setCount] = useState(0);
  const onPressHandler = async () => {
    const newCount = await doServerAction(count);
    setCount(newCount);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <Button onPress={onPressHandler}>Do Server Action</Button>
    </div>
  );
};
