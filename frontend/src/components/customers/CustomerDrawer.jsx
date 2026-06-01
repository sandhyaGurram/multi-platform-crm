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

              <div>

                <p className="text-gray-500">
                  Name
                </p>

                <h3 className="font-bold text-xl">
                  {customer.name}
                </h3>

              </div>

              <div>

                <p className="text-gray-500">
                  Email
                </p>

                <h3 className="font-semibold">
                  {customer.email}
                </h3>

              </div>

              <div>

                <p className="text-gray-500">
                  Phone
                </p>

                <h3 className="font-semibold">
                  {customer.phone}
                </h3>

              </div>

              <div>

                <p className="text-gray-500">
                  Address
                </p>

                <div className="bg-gray-100 p-4 rounded-lg">

                  <p>
                    {customer.city}
                  </p>

                </div>

              </div>

              <div>

                <p className="text-gray-500">
                  Total Orders
                </p>

                <h3 className="font-semibold">
                  {customer.orders}
                </h3>

              </div>

              <div>

                <p className="text-gray-500">
                  Lifetime Value
                </p>

                <h3 className="font-semibold">
                  {customer.spent}
                </h3>

              </div>

              <div>

                <p className="text-gray-500">
                  Platform
                </p>

                <h3 className="font-semibold">
                  {customer.platform}
                </h3>

              </div>

              {/* Recent Orders */}

              <div>

                <p className="text-gray-500 mb-2">
                  Recent Orders
                </p>

                <div className="space-y-3">

                  <div className="bg-gray-100 p-4 rounded-lg">
                    #1001 - ₹3200
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg">
                    #1002 - ₹2100
                  </div>

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