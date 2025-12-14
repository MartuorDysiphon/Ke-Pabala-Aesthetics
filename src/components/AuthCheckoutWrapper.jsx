// components/AuthCheckoutWrapper.jsx
import React from 'react';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Checkout from '../pages/Checkout/Checkout';

const AuthCheckoutWrapper = () => {
  return (
    <>
      <SignedIn>
        <Checkout />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn redirectUrl="/checkout" />
      </SignedOut>
    </>
  );
};

export default AuthCheckoutWrapper;