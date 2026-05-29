import { FaTimes } from "react-icons/fa";

const OrderDrawer = ({ isOpen, onClose, order }) => {

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
            Order Details
          </h2>

          <button onClick={onClose}>
            <FaTimes size={22} />
          </button>

        </div>

        {/* Content */}

        <div className="p-5">

          {order ? (

            <div className="space-y-6">

  {/* Basic Info */}

  <div>

    <p className="text-gray-500">
      Order ID
    </p>

    <h3 className="font-bold text-lg">
      {order.id}
    </h3>

  </div>

  <div>

    <p className="text-gray-500">
      Customer
    </p>

    <h3 className="font-bold text-lg">
      {order.customer}
    </h3>

  </div>

  <div>

    <p className="text-gray-500">
      Phone
    </p>

    <h3 className="font-bold text-lg">
      {order.phone}
    </h3>

  </div>

  <div>

    <p className="text-gray-500">
      Email
    </p>

    <h3 className="font-bold text-lg">
      {order.email}
    </h3>

  </div>

  <div>

    <p className="text-gray-500">
      Platform
    </p>

    <h3 className="font-bold text-lg">
      {order.platform}
    </h3>

  </div>

  <div>

    <p className="text-gray-500">
      Tracking ID
    </p>

    <h3 className="font-bold text-lg">
      {order.trackingId}
    </h3>

  </div>

  <div>

    <p className="text-gray-500">
      Payment Status
    </p>

    <h3 className="font-bold text-lg">
      {order.payment}
    </h3>

  </div>

  <div>

    <p className="text-gray-500">
      Shipping Status
    </p>

    <h3 className="font-bold text-lg">
      {order.shipping}
    </h3>

  </div>

  {/* Address */}

  <div>

    <p className="text-gray-500 mb-2">
      Address
    </p>

    <div className="bg-gray-100 p-4 rounded-lg">

      <p>
        {order.address.city}
      </p>

      <p>
        {order.address.state}
      </p>

      <p>
        {order.address.pincode}
      </p>

    </div>

  </div>

  {/* Products */}

  <div>

    <p className="text-gray-500 mb-2">
      Products
    </p>

    <div className="space-y-3">

      {order.products.map((product, index) => (

        <div
          key={index}
          className="bg-gray-100 p-4 rounded-lg flex items-center justify-between"
        >

          <h3 className="font-semibold">
            {product.name}
          </h3>

          <p>
            Qty: {product.quantity}
          </p>

        </div>

      ))}

    </div>

  </div>

</div>

          ) : (
            <p>No Order Selected</p>
          )}

        </div>

      </div>

    </>
  );
};

export default OrderDrawer;