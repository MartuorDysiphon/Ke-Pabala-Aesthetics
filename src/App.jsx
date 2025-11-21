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

import ContactUs from './components/footer/support/ContactUs';
import FAQ from './components/footer/support/FAQ';
import PaymentMethods from './components/footer/support/PaymentMethods';
import ShippingReturns from './components/footer/support/ShippingReturns';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';


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
            <Route path="contactus" element={<ContactUs />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="paymentmethods" element={<PaymentMethods />} />
            <Route path="shippingreturns" element={<ShippingReturns />} />
            <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          </Route>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;