UPDATE
  public."InventoryItem"
SET
  "currency" = 'GBP',
  "initialPrice" = 0
WHERE
  "currency" IS NULL
  AND "initialPrice" IS NULL;