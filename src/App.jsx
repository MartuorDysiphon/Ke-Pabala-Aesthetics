import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import Home from './pages/Home/home';
import Hair from './pages/Hair/hair';
import Iphones from './pages/Iphones/iphones';
import Jeans from './pages/Jeans/jeans';
import Cart from './pages/Cart/Cart';
import { CartProvider } from './context/CartContext';
import Checkout from './pages/Checkout/Checkout';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="hair" element={<Hair />} />
            <Route path="iphones" element={<Iphones />} />
            <Route path="jeans" element={<Jeans />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;