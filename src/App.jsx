import { BrowserRouter, Route, Routes } from "react-router-dom";
import Katalog from "./pages/catalog";
import Home from "./pages/home";
import ProductDetail from "./pages/productDetails";
import Cart from "./components/cart";
import Checkout from "./pages/checkout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Katalog />} />
          <Route path="/catalog/:id" element={<ProductDetail />} /> 
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
