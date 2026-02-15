import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignedOut } from '@clerk/clerk-react';
import Layout from './components/layout';
import Home from './pages/Home/home';
import Hair from './pages/Hair/hair';
import StraightHair from './pages/Hair/straight/straight';
import Curlyhair from './pages/Hair/curly/curly';
import Glueless from './pages/Hair/glueless/glueless';
import Iphones from './pages/Iphones/iphones';
import Jeans from './pages/Jeans/jeans';
import Cart from './pages/Cart/Cart';
import { CartProvider } from './context/CartContext';
import Checkout from './pages/Checkout/Checkout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import ContactUs from './components/footer/support/ContactUs';
import FAQ from './components/footer/support/FAQ';
import ShippingReturns from './components/footer/support/ShippingReturns';

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
            <Route path="straight" element={<StraightHair />} />
            <Route path="curly" element={<Curlyhair />} />
            <Route path="glueless" element={<Glueless />} />
            <Route path="iphones" element={<Iphones />} />
            <Route path="jeans" element={<Jeans />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="shipping" element={<ShippingReturns />} />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
          </Route>
          <Route 
            path="/sign-in" 
            element={
              <SignedOut>
                <SignInPage />
              </SignedOut>
            } 
          />
          <Route 
            path="/sign-up" 
            element={
              <SignedOut>
                <SignUpPage />
              </SignedOut>
            } 
          />
          <Route 
            path="*" 
            element={
              <div className="container">
                <h1>404 - Page Not Found</h1>
              </div>
            } 
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;