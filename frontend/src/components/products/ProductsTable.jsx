const ProductsTable = ({ products, onView }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
      <table className="w-full min-w-[900px]">
        {/* Header */}

        <thead>
          <tr className="border-b">
            <th className="text-left p-4">Product ID</th>

            <th className="text-left p-4">Category</th>

<th className="text-left p-4">SKU</th>

<th className="text-left p-4">Brand</th>



<th className="text-left p-4">Price</th>

<th className="text-left p-4">Stock</th>

<th className="text-left p-4">Status</th>

<th className="text-center p-4">Actions</th>
          </tr>
        </thead>

        {/* Body */}

        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="border-b hover:bg-gray-50 transition">
              <td className="p-4">
  <div>
    <p className="font-semibold text-gray-800">
      {product.name}
    </p>

    <p className="text-xs text-gray-500">
      #{product.id}
    </p>
  </div>
</td>

              <td className="p-4">{product.category}</td>

              <td className="p-4">{product.sku}</td>

              <td className="p-4">
    {product.vendor}
</td>

              <td className="p-4">

    <p className="font-semibold">
        ₹{product.price}
    </p>

    <p className="text-sm text-gray-400 line-through">
        ₹{product.comparePrice}
    </p>

</td>

              <td className="p-4">

    <div className="font-semibold">

        {product.stock}

    </div>

    <div className="text-xs text-gray-500">

        Available

    </div>

</td>

              {/* Status */}

              <td className="p-4">

    <span
        className={`px-3 py-1 rounded-full text-xs font-semibold

        ${product.status === "In Stock"
            ? "bg-green-100 text-green-700"
            : product.status === "Low Stock"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
        }`}
    >

        {product.status}

    </span>

</td>

              {/* Button */}

              <td className="p-4">
                <div className="flex justify-center gap-2">

    <button
        onClick={() => onView(product)}
        className="bg-[#a51e27] text-white px-3 py-2 rounded-lg"
    >
        View
    </button>

    <button
        className="border px-3 py-2 rounded-lg"
    >
        Edit
    </button>

</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
