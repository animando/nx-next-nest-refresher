import { InventoryItem as InventoryItemType, useInventoryQuery } from '../../generated/product-information-client';

export const InventoryItem = ({item}: {item: InventoryItemType}) => {
  return (
    <tr>
      <td>{item.sku}</td>
      <td>{item.name}</td>
    </tr>
  );
}

export const InventoryItems = ({items}: {items: InventoryItemType[]}) => {
  return (
    <>
      {items.map((item) => <InventoryItem key={item.id} item={item} />)}
    </>
  );
}

export const InventoryList = () => {
  const [{data}] = useInventoryQuery();

  const inventoryItems = data?.inventory;
  return (
    <table>
      <thead>
        <tr><td colSpan={3}>Inventory items</td></tr>
      </thead>
      <tbody>
        {!inventoryItems || !inventoryItems?.length && <tr><td colSpan={3}>Empty list</td></tr>}
        {inventoryItems?.length && <InventoryItems items={inventoryItems} />}
      </tbody>
    </table>
  );
}
