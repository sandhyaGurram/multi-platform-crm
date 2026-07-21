const ProductsTable = ({
  products,
  onView,
  onEdit,
  editingId,
  editedProduct,
  setEditedProduct,
  handleSave,
  setEditingId,

  isAdding,
  newProduct,
  setNewProduct,
  handleAddProduct,
  setIsAdding,
}) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
      <table className="w-full min-w-[900px] table-fixed">
        {/* Header */}

        <thead>
          <tr className="border-b">
            <th className="text-left p-1">Product ID</th>

            <th className="text-left p-1">Category</th>

            <th className="text-left p-1">SKU</th>

            <th className="text-left p-1">Brand</th>



            <th className="text-left p-1">Price</th>

            <th className="text-left p-1">Stock</th>

            <th className="text-left p-1">Status</th>

            <th className="text-center p-1">Actions</th>
          </tr>
        </thead>

        {/* Body */}

        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="border-b hover:bg-gray-50 transition">
              <td className="p-1">
                <div>
                  {
                    editingId === product.id ? (

                      <input
                        className="border rounded px-1  w-full"
                        value={editedProduct.name || ""}
                        onChange={(e) =>
                          setEditedProduct({
                            ...editedProduct,
                            name: e.target.value
                          })
                        }
                      />

                    ) : (

                      <p className="font-semibold text-gray-800">
                        {product.name}
                      </p>

                    )}

                  <p className="text-xs text-gray-500">
                    #{product.id}
                  </p>
                </div>
              </td>

              <td className="p-1">
  {editingId === product.id ? (
    <input
      type="text"
      className="border rounded px-1 py-1 w-full"
      value={editedProduct.category || ""}
      onChange={(e) =>
        setEditedProduct({
          ...editedProduct,
          category: e.target.value,
        })
      }
    />
  ) : (
    product.category
  )}
</td>

              <td className="p-1">
  {editingId === product.id ? (
    <input
      type="text"
      className="border rounded px-1 py-1 w-full"
      value={editedProduct.sku || ""}
      onChange={(e) =>
        setEditedProduct({
          ...editedProduct,
          sku: e.target.value,
        })
      }
    />
  ) : (
    product.sku
  )}
</td>

              <td className="p-1">
                {product.vendor}
              </td>

              <td className="p-1">

                {editingId === product.id ? (
  <input
    type="number"
    className="border rounded px-1 py-1 w-24"
    value={editedProduct.price || ""}
    onChange={(e) =>
      setEditedProduct({
        ...editedProduct,
        price: e.target.value,
      })
    }
  />
) : (
  <p className="font-semibold">
    ₹{product.price}
  </p>
)}

                <p className="text-sm text-gray-400 line-through">
                  ₹{product.comparePrice}
                </p>

              </td>

              <td className="p-1">

                {editingId === product.id ? (
  <input
    type="number"
    className="border rounded px-1 py-1 w-20"
    value={editedProduct.stock || ""}
    onChange={(e) =>
      setEditedProduct({
        ...editedProduct,
        stock: e.target.value,
      })
    }
  />
) : (
  <div className="font-semibold">
    {product.stock}
  </div>
)}

                <div className="text-xs text-gray-500">

                  Available

                </div>

              </td>

              {/* Status */}

              <td className="p-1">
  {editingId === product.id ? (
    <select
      className="border rounded px-1 py-1"
      value={editedProduct.status || ""}
      onChange={(e) =>
        setEditedProduct({
          ...editedProduct,
          status: e.target.value,
        })
      }
    >
      <option>In Stock</option>
      <option>Low Stock</option>
      <option>Out of Stock</option>
    </select>
  ) : (
    <span
      className={`px-1 py-1 rounded-full text-xs font-semibold
        ${
          product.status === "In Stock"
            ? "bg-green-100 text-green-700"
            : product.status === "Low Stock"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-700"
        }`}
    >
      {product.status}
    </span>
  )}
</td>

              {/* Button */}

              <td className="p-1">
  <div className="flex justify-center gap-2">

    {editingId === product.id ? (
      <>
        <button
          onClick={() => handleSave()}
          className="bg-green-600 text-white px-1 py-2 rounded-lg"
        >
          Save
        </button>

        <button
          onClick={() => setEditingId(null)}
          className="bg-gray-500 text-white px-1 py-2 rounded-lg"
        >
          Cancel
        </button>
      </>
    ) : (
      <>
        <button
          onClick={() => onView(product)}
          className="bg-[#a51e27] text-white p-1 rounded-lg"
        >
          View
        </button>

        <button
          onClick={() => onEdit(product)}
          className="bg-blue-500 text-white p-1 rounded-lg"
        >
          Edit
        </button>
      </>
    )}

  </div>
</td>
            </tr>
          ))}


          {isAdding && (
  <tr className="bg-gray-50 border-t">
    <td className="p-2">
      <input
        className="w-full border rounded px-2 py-2"
        placeholder="Product Name"
        value={newProduct.name}
        onChange={(e) =>
          setNewProduct({ ...newProduct, name: e.target.value })
        }
      />
    </td>

    <td className="p-2">
      <input
        className="w-full border rounded px-2 py-2"
        placeholder="Category"
        value={newProduct.category}
        onChange={(e) =>
          setNewProduct({ ...newProduct, category: e.target.value })
        }
      />
    </td>

    <td className="p-2">
      <input
        className="w-full border rounded px-2 py-2"
        placeholder="SKU"
        value={newProduct.sku}
        onChange={(e) =>
          setNewProduct({ ...newProduct, sku: e.target.value })
        }
      />
    </td>

    <td className="p-2">
      <input
        className="w-full border rounded px-2 py-2"
        placeholder="Brand"
        value={newProduct.vendor}
        onChange={(e) =>
          setNewProduct({ ...newProduct, vendor: e.target.value })
        }
      />
    </td>

    <td className="p-2">
      <input
        type="number"
        className="w-full border rounded px-2 py-2"
        placeholder="Price"
        value={newProduct.price}
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: e.target.value })
        }
      />
    </td>

    <td className="p-2">
      <input
        type="number"
        className="w-full border rounded px-2 py-2"
        placeholder="Stock"
        value={newProduct.stock}
        onChange={(e) =>
          setNewProduct({ ...newProduct, stock: e.target.value })
        }
      />
    </td>

    <td className="p-2">
      <select
        className="w-full border rounded px-2 py-2"
        value={newProduct.status}
        onChange={(e) =>
          setNewProduct({ ...newProduct, status: e.target.value })
        }
      >
        <option>In Stock</option>
        <option>Low Stock</option>
        <option>Out of Stock</option>
      </select>
    </td>

    <td className="p-2">
      <div className="flex gap-2 justify-center">
        <button
          onClick={handleAddProduct}
          className="bg-green-600 text-white px-3 py-2 rounded"
        >
          Save
        </button>

        <button
          onClick={() => setIsAdding(false)}
          className="bg-gray-500 text-white px-3 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </td>
  </tr>
)}


        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
