import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

import Dashboard from "../pages/Dashboard";
import Orders from "../pages/Orders";
import Products from "../pages/Products";
import Customers from "../pages/Customers";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Users from "../pages/Users";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminRoute from "../components/AdminRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              {" "}
              <MainLayout />{" "}
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />

          <Route path="orders" element={<Orders />} />

          <Route path="products" element={<Products />} />

          <Route path="customers" element={<Customers />} />

          <Route path="analytics" element={<Analytics />} />

          <Route path="settings" element={<Settings />} />

          <Route
            path="users"
            element={
              <AdminRoute>
                {" "}
                <Users />{" "}
              </AdminRoute>
            }
          />

          <Route
            path="orders/shopify"
            element={<Orders platform="Shopify" />}
          />

          <Route path="orders/amazon" element={<Orders platform="Amazon" />} />

          <Route
            path="orders/flipkart"
            element={<Orders platform="Flipkart" />}
          />

          <Route path="orders/meesho" element={<Orders platform="Meesho" />} />

          <Route
            path="orders/deposite"
            element={<Orders platform="Deposite" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
