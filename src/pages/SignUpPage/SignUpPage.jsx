import { SignUp } from '@clerk/clerk-react';
import Logo from '../../assets/Logo/IMG.jpg';
import './SignUpPage.css';

const SignUpPage = () => {
  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <img 
            src={Logo} 
            alt="Ke Pabala Aesthetics" 
            className="signup-logo"
          />
          <h1 className="signup-title">Join Ke Pabala Aesthetics</h1>
          <p className="signup-subtitle">Create your account</p>
        </div>

        <SignUp 
          routing="path"
          path="/sign-up"
          redirectUrl="/"
          signInUrl="/sign-in"
        />
      </div>
    </div>
  );
};

export default SignUpPage;