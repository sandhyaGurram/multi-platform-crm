import { FaTimes } from "react-icons/fa";

const CustomerDrawer = ({ isOpen, onClose, customer }) => {

  return (

    <>

      {/* Overlay */}

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        />
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

          <h2 className="text-2xl font-bold">
            Customer Details
          </h2>

          <button onClick={onClose}>
            <FaTimes size={22} />
          </button>

        </div>

        {/* Content */}

        <div className="p-5 space-y-6 overflow-y-auto h-full pb-32">

          {customer ? (

<>
    {/* Customer Profile */}

    <div className="border rounded-xl p-5 bg-white shadow-sm">

        <h2 className="text-2xl font-bold text-[#a51e27]">
            {customer.customerName}
        </h2>

        <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-[#a51e27]/10 text-[#a51e27] font-semibold">
            {customer.platforms?.join(", ")}
        </span>

        <div className="mt-5 space-y-3 text-sm">

            <div>
                <p className="text-gray-500">📧 Email</p>
                <p className="font-medium">
                    {customer.customerEmail || "-"}
                </p>
            </div>

            <div>
                <p className="text-gray-500">📞 Phone</p>
                <p className="font-medium">
                    {customer.customerPhone || "-"}
                </p>
            </div>

            <div>
                <p className="text-gray-500">📍 Address</p>
                <p className="font-medium">
                    {customer.customerAddress || "-"}
                </p>
            </div>

        </div>

    </div>



    {/* Summary */}

    <div>

        <h3 className="font-semibold text-lg mb-3">
            Customer Summary
        </h3>

        <div className="grid grid-cols-3 gap-3">

            <div className="rounded-xl bg-gray-50 border p-4 text-center">

                <p className="text-xs text-gray-500">
                    Orders
                </p>

                <h3 className="text-xl font-bold text-[#a51e27]">
                    {customer.totalOrders}
                </h3>

            </div>

            <div className="rounded-xl bg-gray-50 border p-4 text-center">

                <p className="text-xs text-gray-500">
                    Lifetime
                </p>

                <h3 className="text-lg font-bold text-[#a51e27]">
                    ₹{customer.totalSpent?.toLocaleString()}
                </h3>

            </div>

            <div className="rounded-xl bg-gray-50 border p-4 text-center">

                <p className="text-xs text-gray-500">
                    Qty
                </p>

                <h3 className="text-xl font-bold text-[#a51e27]">
                    {customer.totalQuantity || 0}
                </h3>

            </div>

        </div>

    </div>



    {/* Latest Order */}

    <div>

        <h3 className="font-semibold text-lg mb-3">
            Latest Order
        </h3>

        <div className="border rounded-xl p-4 bg-white shadow-sm">

            <div className="flex justify-between">

                <h4 className="font-bold">
                    {customer.latestOrder?.orderId || "-"}
                </h4>

                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                    {customer.latestOrder?.orderStatus || "-"}
                </span>

            </div>

            <p className="mt-2 text-lg font-semibold">
                ₹{customer.latestOrder?.amount || 0}
            </p>

            <p className="text-sm text-gray-500 mt-2">
                {customer.latestOrder?.orderDate}
            </p>

            <hr className="my-4" />

            <h4 className="font-semibold mb-2">
                Items Purchased
            </h4>

            {customer.latestOrder?.items?.length ? (

                customer.latestOrder.items.map((item, index) => (

                    <div
                        key={index}
                        className="flex justify-between py-1"
                    >

                        <span>
                            {item.productName}
                        </span>

                        <span>
                            ×{item.quantity}
                        </span>

                    </div>

                ))

            ) : (

                <p className="text-gray-500 text-sm">
                    No Items
                </p>

            )}

        </div>

    </div>



    {/* Top Products */}

    <div>

        <h3 className="font-semibold text-lg mb-3">
            Top Purchased Products
        </h3>

        <div className="border rounded-xl divide-y">

            {customer.topProducts?.length ? (

                customer.topProducts.map((product, index) => (

                    <div
                        key={index}
                        className="flex justify-between px-4 py-3"
                    >

                        <span>
                            {product.name}
                        </span>

                        <span className="font-semibold">
                            {product.qty} pcs
                        </span>

                    </div>

                ))

            ) : (

                <div className="p-4 text-gray-500">
                    No Products
                </div>

            )}

        </div>

    </div>

</>

) : (

<p>No Customer Selected</p>

)}

        </div>

      </div>

    </>

  );
};

export default CustomerDrawer;