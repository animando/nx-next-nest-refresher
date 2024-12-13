import { getInventoryItems } from './get-inventory-items';
import { InventoryListContainer } from './inventory-list/inventory-list-container';

const Page = async () => {
  await getInventoryItems();

  return (
    <div>
      <h1>My Page</h1>
      <InventoryListContainer />
    </div>
  );
};

export default Page;
