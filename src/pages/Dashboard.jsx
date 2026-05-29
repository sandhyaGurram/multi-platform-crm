// const Dashboard = () => {
//   return (
//     <div className="text-3xl font-bold">
//       Dashboard Page
//     </div>
//   );
// };

// export default Dashboard;
import OrdersTable from "../components/orders/OrdersTable";
import orders from "../data/orders";

const Dashboard = () => {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">
            Total Orders
          </h2>

          <p className="text-4xl font-bold mt-3">
            1245
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">
            Revenue
          </h2>

          <p className="text-4xl font-bold mt-3">
            ₹3.2L
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">
            Customers
          </h2>

          <p className="text-4xl font-bold mt-3">
            845
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">
            Returns
          </h2>

          <p className="text-4xl font-bold mt-3">
            42
          </p>
        </div>

      </div>
    <div className="mt-10">

  <h2 className="text-2xl font-bold mb-5">
    Recent Orders
  </h2>

  <OrdersTable orders={orders} />

</div>

    </div>
  );
};

export default Dashboard;