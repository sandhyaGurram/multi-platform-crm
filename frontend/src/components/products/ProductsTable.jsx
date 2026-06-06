const ProductsTable = ({ products, onView }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
      <table className="w-full min-w-[900px]">
        {/* Header */}

        <thead>
          <tr className="border-b">
            <th className="text-left p-4">Product ID</th>

            <th className="text-left p-4">Product Name</th>

            <th className="text-left p-4">Category</th>

            <th className="text-left p-4">SKU</th>

            <th className="text-left p-4">Price</th>

            <th className="text-left p-4">Stock</th>

            <th className="text-left p-4">Status</th>

            <th className="text-left p-4">Action</th>
          </tr>
        </thead>

        {/* Body */}

        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="border-b hover:bg-gray-50 transition">
              <td className="p-4">{product.id}</td>

              <td className="p-4 font-semibold">{product.name}</td>

              <td className="p-4">{product.category}</td>

              <td className="p-4">{product.sku}</td>

              <td className="p-4">{product.price}</td>

              <td className="p-4">{product.stock}</td>

              {/* Status */}

              <td className="p-4">
                <span
                  className={`
                    px-3 py-1 rounded-full text-sm font-bold

                    ${product.status === "In Stock" && "bg-green-100 text-green-600"}

                    ${product.status === "Low Stock" && "bg-yellow-100 text-yellow-600"}

                    ${product.status === "Out of Stock" && "bg-red-100 text-red-600"}
                  `}
                >
                  {product.status}
                </span>
              </td>

              {/* Button */}

              <td className="p-4">
                <button
                  onClick={() => onView(product)}
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
