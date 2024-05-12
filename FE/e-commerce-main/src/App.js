import "./App.scss";
import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Categories from "./components/Categories/Categories";

import Brands from "./components/Brands/Brands";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound";
import Orders from "./components/Orders/Orders";
import UserContextProvider from "./Context/UserContext";
import CartContextProvider from "./Context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProtectedAuth from "./components/ProtectedAuth/ProtectedAuth";

import { QueryClient, QueryClientProvider } from "react-query";

import ProductDetails from "./components/ProductDetails/ProductDetails";
import SubCategories from "./components/SubCategories/SubCategories";
import { Toaster } from "react-hot-toast";
import Checkout from "./components/Checkout/Checkout";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Profile/EditProfile";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Addproduct from "./components/AddProduct/Addproduct.jsx";
import EditProduct from "./components/EditProduct/EditProduct.jsx";
const queryClient = new QueryClient();

const routes = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/editproduct/:id",
        element: (
          <ProtectedRoute>
            <EditProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "addproduct",
        element: (
          <ProtectedRoute>
            <Addproduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },

      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "EditProfile",
        element: (
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "subcategories/:id",
        element: (
          <ProtectedRoute>
            <SubCategories />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "Dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: (
          <ProtectedAuth>
            <Login />
          </ProtectedAuth>
        ),
      },
      {
        path: "register",
        element: (
          <ProtectedAuth>
            <Register />
          </ProtectedAuth>
        ),
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <CartContextProvider>
          <RouterProvider router={routes}></RouterProvider>
          <Toaster />
        </CartContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
