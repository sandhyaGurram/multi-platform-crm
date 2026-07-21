import { FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";

const ProductDrawer = ({ isOpen, onClose, product,mode }) => {

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    sku: "",
    price: "",
    stock: "",
    status: ""
});

  return (
    <>
      {/* Overlay */}

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      )}

      {/* Drawer */}

      <div
        className={`
          fixed top-0 right-0 h-full w-full md:w-[450px]
          bg-white shadow-2xl z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}

        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-2xl font-bold">Product Details</h2>

          <button onClick={onClose}>
            <FaTimes size={22} />
          </button>
        </div>

        {/* Content */}

        <div className="p-5 space-y-6 overflow-y-auto h-full pb-32">
          {product ? (
            <>
              {/* Product Name */}

              <div>
                <p className="text-gray-500">Product Name</p>

                {
mode === "view" ? (

<h3 className="font-bold text-xl">
    {product.name}
</h3>

) : (

<input
    className="w-full border rounded-lg p-2"
    value={formData.name}
    onChange={(e)=>
        setFormData({
            ...formData,
            name:e.target.value
        })
    }
/>

)
}
              </div>

              {/* SKU */}

              <div>
                <p className="text-gray-500">SKU</p>

                <h3 className="font-semibold">{product.sku}</h3>
              </div>

              {/* Category */}

              <div>
                <p className="text-gray-500">Category</p>

                <h3 className="font-semibold">{product.category}</h3>
              </div>

              {/* Price */}

              <div>
                <p className="text-gray-500">Price</p>

                <h3 className="font-semibold">{product.price}</h3>
              </div>

              {/* Stock */}

              <div>
                <p className="text-gray-500">Stock</p>

                <h3 className="font-semibold">{product.stock}</h3>
              </div>

              {/* Status */}

              <div>
                <p className="text-gray-500">Status</p>

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
              </div>

              {/* Description */}

              <div>
                <p className="text-gray-500">Description</p>

                <p className="mt-2 text-gray-700">{product.description}</p>
              </div>

              {/* Platform */}

              <div>
                <p className="text-gray-500">Platform</p>

                <h3 className="font-semibold">{product.platform}</h3>
              </div>

              {/* Inventory */}

              <div>
                <p className="text-gray-500 mb-2">Inventory</p>

                <div className="bg-gray-100 p-4 rounded-lg">
                  <p>Warehouse Stock: {product.stock}</p>

                  <p>Reserved: 2</p>

                  <p>Available: {product.stock - 2}</p>
                </div>
              </div>

              {/* Variants */}

              <div>
                <p className="text-gray-500 mb-2">Variants</p>

                <div className="space-y-3">
                  {product.variants.map((variant, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-lg">
                      <h3 className="font-semibold">{variant.name}</h3>

                      <p>Price: {variant.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <p>No Product Selected</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDrawer;
