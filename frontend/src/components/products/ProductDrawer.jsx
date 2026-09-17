import { FaTimes } from "react-icons/fa";
import { getTotalStock, getProductStatus } from "../../utils/productUtils";

const DetailRow = ({ label, value, children }) => {
  return (
    <div className="flex justify-between items-center min-h-[38px] border-b border-[#d1ccd3] last:border-b-0">
      <span className="text-[15px] text-[#64748b]">{label}</span>

      <span className="text-[15px] font-semibold text-[#475569] text-right ml-4">
        {children ?? value}
      </span>
    </div>
  );
};

const SectionCard = ({ children, className = "" }) => {
  return (
    <div className={`bg-[#f8f9fa] rounded-2xl px-3 py-2 ${className}`}>
      {children}
    </div>
  );
};

const ProductDrawer = ({ isOpen, onClose, product, mode }) => {
  if (!product) return null;

  const status = getProductStatus(product);
  const totalStock = getTotalStock(product);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 h-full
          w-full sm:w-[500px] md:w-[620px]
          bg-white shadow-2xl z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* ================= HEADER ================= */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-[22px] font-semibold text-gray-900">
                Product Details
              </h2>

              <p className="text-sm text-[#64748b] mt-1">
                #{product.sku || product._id}
              </p>
            </div>

            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 transition"
            >
              <FaTimes size={22} />
            </button>
          </div>

          <div className="border-b border-[#6b6370] mt-5" />
        </div>

        {/* ================= CONTENT ================= */}
        <div className="px-6 pb-10 overflow-y-auto h-[calc(100%-105px)]">
          {/* ================= BASIC DETAILS ================= */}

          <SectionCard>
            <DetailRow label="Product Name" value={product.productName} />

            <DetailRow label="SKU" value={product.sku || "-"} />

            <DetailRow label="Category" value={product.category || "-"} />

            <DetailRow label="Brand" value={product.vendor || "-"} />
          </SectionCard>

          {/* ================= PRICE & STOCK ================= */}

          <SectionCard className="mt-5">
            <DetailRow label="Price" value={`₹${product.price || 0}`} />

            <DetailRow
              label="Compare Price"
              value={`₹${product.comparePrice || 0}`}
            />

            <DetailRow label="Stock" value={totalStock} />

            <DetailRow label="Status">
              <span
                className={`
                  inline-block px-2.5 py-1 rounded-full text-xs font-semibold
                  ${
                    status === "In Stock"
                      ? "bg-green-100 text-green-700"
                      : status === "Low Stock"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }
                `}
              >
                {status}
              </span>
            </DetailRow>
          </SectionCard>

          {/* ================= INVENTORY ================= */}

          <div className="mt-5">
            <h3 className="text-[15px] text-[#64748b] mb-2">Inventory</h3>

            <SectionCard>
              <DetailRow
                label="Shopify"
                value={product.warehouseStock?.shopify ?? 0}
              />

              <DetailRow
                label="Hyderabad"
                value={product.warehouseStock?.hyderabad ?? 0}
              />

              <DetailRow
                label="Nalgonda"
                value={product.warehouseStock?.nalgonda ?? 0}
              />

              <DetailRow label="Total Stock" value={totalStock} />
            </SectionCard>
          </div>

          {/* ================= VARIANTS ================= */}

          {product.variants?.length > 0 && (
            <div className="mt-5">
              <h3 className="text-[15px] text-[#64748b] mb-2">Variants</h3>

              <div className="space-y-2">
                {product.variants.map((variant, index) => (
                  <div
                    key={index}
                    className="bg-[#f8f9fa] rounded-2xl px-3 py-2"
                  >
                    <DetailRow label="Variant" value={variant.name || "-"} />

                    <DetailRow label="Price" value={`₹${variant.price || 0}`} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDrawer;

// import { FaTimes } from "react-icons/fa";
// import { useState, useEffect } from "react";
// import { getTotalStock, getProductStatus, } from "../../utils/productUtils";

// const Row = ({ label, value }) => {
//   return (
//     <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
//       <span className="text-gray-500 font-medium">
//         {label}
//       </span>

//       <span className="font-semibold text-gray-800">
//         {value}
//       </span>
//     </div>
//   );
// };

// const ProductDrawer = ({ isOpen, onClose, product,mode }) => {

//   const [formData, setFormData] = useState({
//     productName: "",
//     category: "",
//     sku: "",
//     price: "",
//     warehouseStock: {
//     shopify: 0,
//     hyderabad: 0,
//     nalgonda: 0,
//   },
//     status: ""
// });

//   return (
//     <>
//       {/* Overlay */}

//       {isOpen && (
//         <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
//       )}

//       {/* Drawer */}

//       <div
//         className={`
//           fixed top-0 right-0 h-full w-full md:w-[620px]
//           bg-white shadow-2xl z-50
//           transform transition-transform duration-300
//           ${isOpen ? "translate-x-0" : "translate-x-full"}
//         `}
//       >
//         {/* Header */}

//         <div className="flex items-center justify-between p-5 border-b">
//           <h2 className="text-2xl font-bold">Product Details</h2>

//           <button onClick={onClose}>
//             <FaTimes size={22} />
//           </button>
//         </div>

//         {/* Content */}

//         <div className="p-5 space-y-6 overflow-y-auto h-full pb-32">
//           {product ? (
//             <>
//               {/* Product Name */}

//               <div>
//                 <p className="text-gray-500">Product Name</p>

//                 {
// mode === "view" ? (

// <h3 className="font-bold text-xl">
//     {product.productName}
// </h3>

// ) : (

// <input
//     className="w-full border rounded-lg p-2"
//     value={formData.productName}
//     onChange={(e)=>
//         setFormData({
//             ...formData,
//             productName:e.target.value
//         })
//     }
// />

// )
// }
//               </div>

//               {/* SKU */}

//               <div>
//                 <p className="text-gray-500">SKU</p>

//                 <h3 className="font-semibold">{product.sku}</h3>
//               </div>

//               {/* Category */}

//               <div>
//                 <p className="text-gray-500">Category</p>

//                 <h3 className="font-semibold">{product.category}</h3>
//               </div>

//               {/* Price */}

//               <div>
//                 <p className="text-gray-500">Price</p>

//                 <h3 className="font-semibold">{product.price}</h3>
//               </div>

//               {/* Stock */}

//               <div>
//                 <p className="text-gray-500">Stock</p>

//                <h3 className="font-semibold">
//   {getTotalStock(product)}
// </h3>
//               </div>

//               {/* Status */}

//               <div>
//                 <p className="text-gray-500">Status</p>

//                 <span
//                   className={`
//                     px-3 py-1 rounded-full text-sm font-bold

//                     ${getProductStatus(product) === "In Stock" && "bg-green-100 text-green-600"}

//                     ${getProductStatus(product) === "Low Stock" && "bg-yellow-100 text-yellow-600"}

//                     ${getProductStatus(product) === "Out of Stock" && "bg-red-100 text-red-600"}
//                   `}
//                 >
//                   {getProductStatus(product)}
//                 </span>
//               </div>

//               {/* Inventory */}

//               <div>
//                 <p className="text-gray-500 mb-2">Inventory</p>

//                 <div className="bg-gray-100 p-4 rounded-lg">
//                   <p>Shopify: {product.warehouseStock.shopify}</p>

// <p>Hyderabad: {product.warehouseStock.hyderabad}</p>

// <p>Nalgonda: {product.warehouseStock.nalgonda}</p>

// <p className="font-semibold mt-2">
//   Total: {getTotalStock(product)}
// </p>
//                 </div>
//               </div>

//               {/* Variants */}

//               <div>
//                 <p className="text-gray-500 mb-2">Variants</p>

//                 <div className="space-y-3">
//                   {product.variants?.map((variant, index) => (
//   <div key={index} className="bg-gray-100 p-4 rounded-lg">
//     <h3 className="font-semibold">{variant.name}</h3>
//     <p>Price: ₹{variant.price}</p>
//   </div>
// ))}
//                 </div>
//               </div>
//             </>
//           ) : (
//             <p>No Product Selected</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductDrawer;
