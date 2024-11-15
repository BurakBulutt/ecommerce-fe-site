import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./components/navigation";
import Footer from "./components/footer";
import Login from "./components/authentication/login";
import Register from "./components/authentication/register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Shop from "./components/shop";
import Slider from "./components/home/slider/slider";
import ProductPage from "./components/product/product-page";
import Checkout from "./components/checkout";
import OrderList from "./components/order/orderlist";
import OrderSummary from "./components/order/ordersummary";
import { Notifications } from "react-push-notification";
import { ApplicationContextProvider } from "./context/ApplicationContext";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <ApplicationContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Slider />} />
          <Route path="shop" element={<Shop />} />
          <Route path="products/:id" element={<ProductPage />} />
          <Route path="checkout" element={<Checkout />}></Route>
          <Route path="orders/my-orders/" element={<OrderList />}></Route>
          <Route
            path="orders/my-orders/:code"
            element={<OrderSummary />}
          ></Route>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
      <Notifications />
      <ToastContainer />
    </ApplicationContextProvider>
  );
};

export default App;
