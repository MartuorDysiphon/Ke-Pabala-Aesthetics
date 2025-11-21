import { SignIn } from '@clerk/clerk-react';
import Logo from '../../assets/Logo/IMG.jpg';
import './SignInPage.css';

const SignInPage = () => {
  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="signin-header">
          <img 
            src={Logo} 
            alt="Ke Pabala Aesthetics" 
            className="signin-logo"
          />
          <h1 className="signin-title">Ke Pabala Aesthetics</h1>
          <p className="signin-subtitle">Sign in to your account</p>
        </div>

        <SignIn 
          routing="path"
          path="/sign-in"
          redirectUrl="/"
          signUpUrl="/sign-up"
        />
      </div>
    </div>
  );
};

export default SignInPage;