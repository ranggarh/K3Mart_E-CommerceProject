import { BrowserRouter, Route, Routes } from "react-router-dom";
import Katalog from "./pages/catalog";
import Home from "./pages/home";
import ProductDetail from "./pages/productDetails";
import Cart from "./components/cart";
import Checkout from "./pages/checkout";
import Payment from "./pages/payment";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import ProtectedRoute from "./components/protectedRoutes";
import History from "./pages/history";
import Dashboard from "./pages/admin/dashboard";
import Produk from "./pages/admin/product";
import Transaction from "./pages/admin/transaction";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/catalog" element={<Katalog />} />
          <Route path="/catalog/:id" element={<ProductDetail />} /> 
          <Route path="/cart" element={<Cart />}></Route>
          <Route element={<ProtectedRoute />}>
              <Route path="/checkout" element={<Checkout />} />
          </Route>
          <Route path="/payment" element={<Payment />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/riwayat" element={<History />} />
          </Route>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/produk" element={<Produk />} />
          <Route path="/admin/transaksi" element={<Transaction />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
