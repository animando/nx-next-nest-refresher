import { InventoryList } from './inventory-list/inventory-list';
import { NextUIProvider } from '@nextui-org/react';

const Page = async () => {
  return (
    <NextUIProvider>
      <div>
        <h1 className="prose prose-h1">My Page</h1>
        <InventoryList />
      </div>
    </NextUIProvider>
  );
};

export default Page;
