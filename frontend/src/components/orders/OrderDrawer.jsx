const OrderDrawer = ({ isOpen, onClose, order, setEditOpen }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed top-0 right-0 w-[400px] h-full bg-white shadow-2xl p-6 z-50">
      <button
        onClick={onClose}
        className="mb-6 bg-black text-white px-4 py-2 rounded-lg"
      >
        Close
      </button>

      <h2 className="text-2xl font-bold mb-6">Order Details</h2>

      <div className="space-y-4">
        <p>
          <strong>Order ID:</strong> {order.orderId}
        </p>

        <p>
          <strong>Customer:</strong> {order.customerName || order.customer}
        </p>
        <p>
          <strong>Product:</strong>
          {order.productName}
        </p>

        <p>
          <strong>SKU:</strong>
          {order.sku}
        </p>

        <p>
          <strong>Variant:</strong>
          {order.variant}
        </p>

        <p>
          <strong>Quantity:</strong>
          {order.quantity}
        </p>

        <p>
          <strong>Amount:</strong> ₹{order.amount}
        </p>

        <p>
          <strong>Category:</strong> {order.category}
        </p>

        <p>
          <strong>Brand:</strong> {order.brand}
        </p>

        <p>
          <strong>Unit Price:</strong> ₹{order.unitPrice}
        </p>

        <p>
          <strong>Phone:</strong> {order.customerPhone}
        </p>

        <p>
          <strong>Email:</strong> {order.customerEmail}
        </p>

        <p>
          <strong>Tracking:</strong> {order.trackingId}
        </p>

        <p>
          <strong>Status:</strong> {order.status}
        </p>

        <p>
          <strong>Platform:</strong> {order.platform}
        </p>
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
