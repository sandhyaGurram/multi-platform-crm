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

export const getProductStatus = (product) => {
  const totalStock = getTotalStock(product);

  if (totalStock === 0) {
    return "Out of Stock";
  }

  if (totalStock <= 10) {
    return "Low Stock";
  }

  return "In Stock";
};