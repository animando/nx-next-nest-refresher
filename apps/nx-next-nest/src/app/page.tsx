import { InventoryList } from './inventory-list/inventory-list';

const Page = async () => {
  return (
    <div>
      <h1>My Page</h1>
      <InventoryList />
    </div>
  );
};

export const revalidate = 36000;

export default Page;
