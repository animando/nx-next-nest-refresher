import { InventoryList } from './inventory-list/inventory-list';

const Page = async () => {
  return (
    <div>
      <h1 className="prose prose-h1">Inventory</h1>
      <InventoryList />
    </div>
  );
};

export default Page;
