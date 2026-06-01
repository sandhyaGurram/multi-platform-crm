const CustomersTable = ({ customers, onView }) => {

  return (

    <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">

      <table className="w-full min-w-[1000px]">

        {/* Header */}

        <thead>

          <tr className="border-b">

            <th className="text-left p-4">
              Customer ID
            </th>

            <th className="text-left p-4">
              Name
            </th>

            <th className="text-left p-4">
              Email
            </th>

            <th className="text-left p-4">
              Phone
            </th>

            <th className="text-left p-4">
              City
            </th>

            <th className="text-left p-4">
              Orders
            </th>

            <th className="text-left p-4">
              Spent
            </th>

            <th className="text-left p-4">
              Status
            </th>

            <th className="text-left p-4">
              Platform
            </th>

            <th className="text-left p-4">
              Action
            </th>

          </tr>

        </thead>

        {/* Body */}

        <tbody>

          {customers.map((customer, index) => (

            <tr
              key={index}
              className="border-b hover:bg-gray-50 transition"
            >

              <td className="p-4">
                {customer.id}
              </td>

              <td className="p-4 font-semibold">
                {customer.name}
              </td>

              <td className="p-4">
                {customer.email}
              </td>

              <td className="p-4">
                {customer.phone}
              </td>

              <td className="p-4">
                {customer.city}
              </td>

              <td className="p-4">
                {customer.orders}
              </td>

              <td className="p-4">
                {customer.spent}
              </td>

              {/* Status */}

              <td className="p-4">

                <span
                  className={`
                    px-3 py-1 rounded-full text-sm font-bold

                    ${customer.status === "Active" && "bg-green-100 text-green-600"}

                    ${customer.status === "Inactive" && "bg-red-100 text-red-600"}
                  `}
                >
                  {customer.status}
                </span>

              </td>

              {/* Platform */}

              <td className="p-4">
                {customer.platform}
              </td>

              {/* Button */}

              <td className="p-4">

                <button
                  onClick={() => onView(customer)}
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                >
                  View
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
};

export default CustomersTable;