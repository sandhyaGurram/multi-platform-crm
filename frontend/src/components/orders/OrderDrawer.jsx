const OrderDrawer = ({ isOpen, onClose, order, setEditOpen }) => {
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
          <span className="text-gray-500">Total Amount</span>
          <span className="font-medium">{order.amount}</span>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-2 mb-4">
        {/* <h3 className="font-semibold mb-3">Shipping Information</h3> */}

        <div className="flex justify-between py-1 border-b">
          <span className="text-gray-500">Tracking Id</span>
          <span className="font-medium">{order.trackingId}</span>
        </div>

        <div className="flex justify-between py-1 border-b">
          <span className="text-gray-500">Payment Method</span>
          <span className="font-medium">{order.paymentMethod}</span>
        </div>
      </div>

      <button
        onClick={() => {
          onClose();

          setEditOpen(true);
        }}
        className="bg-blue-500 text-white px-5 py-3 rounded-lg mt-6"
      >
        Edit Order
      </button>
    </div>
  );
};

export default OrderDrawer;
