import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  SignupPage,
  ActivationPage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProductDetailsPage,
  ProfilePage,
  CheckoutPage,
  PaymentPage,
  OrderSuccessPage,
  ShopCreatePage,
  ShopLoginPage,
  SellerActivationPage,
  OrderDetailsPage,
  TrackOrderPage,
} from "./routes/AllRoutes";

import {
  ShopDashboardPage,
  ShopCreateProductPage,
  ShopAllProductsPage,
  ShopCreateEventsPage,
  ShopAllEventsPage,
  ShopAllCoupounsPage,
  ShopPreviewPage,
  ShopAllOrdersPage,
  ShopOrderDetailsPage,
  ShopAllRefundsPage,
  ShopSettingsPage,
} from "./routes/ShopRoutes";

import {
  AdminDashboardEvents,
  AdminDashboardOrders,
  AdminDashboardPage,
  AdminDashboardSellers,
  AdminDashboardUsers,
  AdminDashboardWithdraw,
} from "./routes/AdminRoutes";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadUser, loadSeller } from "./redux/actions/user";
import Store from "./redux/store";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ShopHomePage } from "./ShopRoutes";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import { getAllProducts } from "./redux/actions/product";
import { getAllEvents } from "./redux/actions/event";
import axios from "axios";
import { server } from "./server";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AdminDashboardProducts from "./pages/AdminDashboardProducts";

const App = () => {
  const [stripeApikey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
    console.log(data.stripeApikey);
  }

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
    getStripeApikey();
  }, []);

  // console.log(stripeApikey);
  return (
    <BrowserRouter>
      {stripeApikey && (
        <Elements stripe={loadStripe(stripeApikey)}>
          <Routes>
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Elements>
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route
          path="/seller/activation/:activation_token"
          element={<SellerActivationPage />}
        />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        <Route path="/order/success/" element={<OrderSuccessPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/track/order/:id"
          element={
            <ProtectedRoute>
              <TrackOrderPage />
            </ProtectedRoute>
          }
        />
        <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
        {/* shop routes */}
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute>
              <ShopHomePage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <SellerProtectedRoute>
              <ShopDashboardPage />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard-orders"
          element={
            <SellerProtectedRoute>
              <ShopAllOrdersPage />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/order/:id"
          element={
            <SellerProtectedRoute>
              <ShopOrderDetailsPage />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard-create-product"
          element={
            <SellerProtectedRoute>
              <ShopCreateProductPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-products"
          element={
            <SellerProtectedRoute>
              <ShopAllProductsPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-event"
          element={
            <SellerProtectedRoute>
              <ShopCreateEventsPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-events"
          element={
            <SellerProtectedRoute>
              <ShopAllEventsPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-coupouns"
          element={
            <SellerProtectedRoute>
              <ShopAllCoupounsPage />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard-refunds"
          element={
            <SellerProtectedRoute>
              <ShopAllRefundsPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <SellerProtectedRoute>
              <ShopSettingsPage />
            </SellerProtectedRoute>
          }
        />
        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-users"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardUsers />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-sellers"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardSellers />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-orders"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardOrders />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-products"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardProducts />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-events"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardEvents />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-withdraw-request"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardWithdraw />
            </ProtectedAdminRoute>
          }
        />
      </Routes>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
};

export default App;
