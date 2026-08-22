const OrderDrawer = ({ isOpen, onClose, order, setEditOpen }) => {
  const currentUser = JSON.parse(localStorage.getItem("crmUser"));

  if (!isOpen || !order) return null;

  return (
    <div className="fixed right-0 top-0 h-screen w-[450px] bg-white shadow-xl p-6 z-[9999] overflow-y-auto">
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">Order Details</h2>
          <p className="text-sm text-gray-500">#{order.orderId}</p>
        </div>

        <button
          onClick={onClose}
          className="text-gray-500 hover:text-black text-2xl"
        >
          ✕
        </button>
      </div>

      <div className="bg-gray-50 rounded-xl p-2 mb-4">
        {/* <h3 className="font-semibold mb-3">Order Information</h3> */}

        <div className="flex justify-between py-1 border-b">
          <span className="text-gray-500">Order Id</span>
          <span className="font-medium">{order.orderId}</span>
        </div>

        <div className="flex justify-between py-1 border-b">
          <span className="text-gray-500">Platform</span>
          <span className="font-medium">{order.platform}</span>
        </div>

        <div className="flex justify-between py-1 border-b">
          <span className="text-gray-500">Status</span>
          <span className="font-medium">{order.status}</span>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-2 mb-4">
        {/* <h3 className="font-semibold mb-3">Customer Information</h3> */}

        <div className="flex justify-between py-1 border-b">
          <span className="text-gray-500">Customer</span>
          <span className="font-medium">{order.customerName}</span>
        </div>

        <div className="flex justify-between py-1 border-b">
          <span className="text-gray-500">Phone No. </span>
          <span className="font-medium">{order.customerPhone}</span>
        </div>

        <div className="flex justify-between py-1 border-b">
          <span className="text-gray-500">Address</span>
          <span className="font-medium">{order.customerAddress}</span>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-2 mb-4">
        {/* <h3 className="font-semibold mb-3">Product Information</h3> */}

        <div className="flex justify-between py-1 border-b">
          <span className="text-gray-500">Product</span>
          <span className="font-medium">{order.productName}</span>
        </div>

        <div className="flex justify-between py-1 border-b">
          <span className="text-gray-500">Quantity</span>
          <span className="font-medium">{order.quantity}</span>
        </div>

        <div className="flex justify-between py-1 border-b">
          <span className="text-gray-500">Unit Price</span>
          <span className="font-medium">{order.unitPrice}</span>
        </div>

        <div className="flex justify-between py-1 border-b">
    <span className="text-gray-500">Tax</span>

    <span className="font-medium">
      ₹{Number(order.taxAmount || 0).toFixed(2)}
    </span>
  </div>

  <div className="flex justify-between py-1">
    <span className="text-gray-500">Shipping Charges</span>

    <span className="font-medium">
      ₹{Number(order.shippingCharge || 0).toFixed(2)}
    </span>
  </div>
  <div className="flex justify-between py-1 border-b">
  <span className="text-gray-500">Discount</span>

  <span className="font-medium">
    ₹{Number(order.discountAmount || 0).toFixed(2)}
  </span>
</div>

        <div className="flex justify-between py-1 border-b">
          <span className="text-gray-500">Total Amount</span>
          <span className="font-medium">{order.amount}</span>
        </div>
      </div>

    <div className="bg-gray-50 rounded-xl p-2 mb-4">
  {/* Shipping Information */}

  <div className="flex justify-between py-1 border-b">
    <span className="text-gray-500">Tracking ID</span>

    <span className="font-medium">
      {order.trackingUrl ? (
        <a
          href={order.trackingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {order.trackingId || "View Tracking"}
        </a>
      ) : (
        order.trackingId || "-"
      )}
    </span>
  </div>

  <div className="flex justify-between py-1 border-b">
    <span className="text-gray-500">Delivery Status</span>

    <span className="font-medium">
      {order.deliveryStatus || "-"}
    </span>
  </div>

  <div className="flex justify-between py-1 border-b">
    <span className="text-gray-500">Courier Partner</span>

    <span className="font-medium">
      {order.courierPartner || "-"}
    </span>
  </div>

  <div className="flex justify-between py-1 border-b">
    <span className="text-gray-500">Payment Method</span>

    <span className="font-medium">
      {order.paymentMethod || "-"}
    </span>
  </div>

  
 
</div>

      {currentUser?.role === "admin" && (
        <button
          onClick={() => {
            onClose();

            setEditOpen(true);
          }}
          className="bg-blue-500 text-white px-5 py-3 rounded-lg mt-6"
        >
          Edit Order
        </button>
      )}
    </div>
  );
};

export default OrderDrawer;
