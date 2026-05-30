import Badge from "../ui/Badge";
import Button from "../ui/Button";

const OrdersTable = ({ orders, onView }) => {

  return (

    <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">

      <table className="w-full min-w-[700px]">

        <thead>

          <tr className="border-b">

            <th className="text-left p-4">
              Order ID
            </th>

            <th className="text-left p-4">
              Customer
            </th>

            <th className="text-left p-4">
              Amount
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

        <tbody>

          {orders.map((order, index) => (

            <tr
              key={index}
              className="border-b hover:bg-gray-50 transition"
            >

              <td className="p-4">
                {order.orderId}
              </td>

              <td className="p-4">
                {order.customer}
              </td>

              <td className="p-4">
                {order.amount}
              </td>

              <td className="p-4">
                <Badge status={order.status} />
                  </td>
                  <td className="p-4">

  <span
    className={`
      px-3 py-1 rounded-full text-sm font-bold

      ${order.platform === "Shopify" && "bg-green-100 text-green-700"}

      ${order.platform === "Amazon" && "bg-yellow-100 text-yellow-700"}

      ${order.platform === "Flipkart" && "bg-blue-100 text-blue-700"}
    `}
  >
    {order.platform}
  </span>

</td>

              <td className="p-4">
                <div onClick={() => onView(order)}>
  <Button text="View" />
</div>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default OrdersTable;