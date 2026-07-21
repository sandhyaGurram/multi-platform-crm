export const getTotalStock = (product) => {
  if (!product.warehouseStock) {
    return product.stock || 0;
  }

  return (
    product.warehouseStock.shopify +
    product.warehouseStock.hyderabad +
    product.warehouseStock.nalgonda
  );
};