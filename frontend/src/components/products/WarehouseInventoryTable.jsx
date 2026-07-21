import {
  getTotalStock,
  getProductStatus,
} from "../../utils/productUtils";

const user = JSON.parse(localStorage.getItem("crmUser"));
const isAdmin = user?.role === "admin";

const WarehouseInventoryTable = ({ products,
    setProducts, }) => {
  

 const handleChange = (id, field, value) => {

  if (!isAdmin) {
    return;
  }

  setProducts((prev) =>
    prev.map((product) =>
      product.id === id
        ? {
            ...product,
            warehouseStock: {
              ...product.warehouseStock,
              [field]: Number(value),
            },
          }
        : product
    )
  );
};

  return (
    <div className="bg-white rounded-xl shadow border mt-8 p-6">

      <h2 className="text-2xl font-bold mb-6">
        Warehouse Inventory
      </h2>

      <div className="overflow-x-auto">

        <table className="min-w-full border">

          <thead className="bg-gray-100">

            <tr>

              <th className="border p-3 text-left">Product</th>

              <th className="border p-3">SKU</th>

              <th className="border p-3 bg-green-50">
                Shopify
                <br />
                <span className="text-xs text-green-600">
                  Auto Sync
                </span>
              </th>

              <th className="border p-3">
                Hyderabad
                <br />
                <span className="text-xs text-gray-500">
                  Manual
                </span>
              </th>

              <th className="border p-3">
                Nalgonda
                <br />
                <span className="text-xs text-gray-500">
                  Manual
                </span>
              </th>

              <th className="border p-3 font-bold">
                Total
              </th>

            </tr>

          </thead>

          <tbody>

            {products.map((item, index) => {

              const total =
                item.warehouseStock.shopify +
    item.warehouseStock.hyderabad +
    item.warehouseStock.nalgonda;

              return (

                <tr key={item.id}>

                  <td className="border p-3">

                    <div className="font-semibold">
                      {item.productName}
                    </div>

                    <div className="text-xs text-gray-500">
                      #{item.id}
                    </div>

                  </td>

                  <td className="border p-3">
                    {item.sku}
                  </td>

                  <td className="border p-3 text-center font-semibold bg-green-50">

                    {item.warehouseStock.shopify}

                  </td>

                  <td className="border p-3">

                   <input
  type="number"
  value={item.warehouseStock.hyderabad}
  disabled={!isAdmin}
  onChange={(e) =>
    handleChange(item.id, "hyderabad", e.target.value)
  }
  className={`w-20 border rounded px-2 py-1 ${
    !isAdmin
      ? "bg-gray-100 cursor-not-allowed text-gray-500"
      : ""
  }`}
/>

                  </td>

                  <td className="border p-3">

                    <input
  type="number"
  value={item.warehouseStock.nalgonda}
  disabled={!isAdmin}
  onChange={(e) =>
    handleChange(item.id, "nalgonda", e.target.value)
  }
  className={`w-20 border rounded px-2 py-1 ${
    !isAdmin
      ? "bg-gray-100 cursor-not-allowed text-gray-500"
      : ""
  }`}
/>

                  </td>

                  <td className="border p-3 text-center font-bold">

                    {total}

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default WarehouseInventoryTable;