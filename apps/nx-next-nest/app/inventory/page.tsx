import { InventoryListContainer } from './inventory-list/inventory-list-container';

const Page = async () => {
  return (
    <div>
      <h1 className="prose prose-h1">Inventory</h1>
      <InventoryListContainer />
    </div>
  );
};

export default Page;
