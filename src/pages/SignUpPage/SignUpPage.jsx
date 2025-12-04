import { SignUp } from '@clerk/clerk-react';
import './SignUpPage.css';

const SignUpPage = () => {
    return (
        <div className="signup-page">
            <div className="container">
                <div className="signup-container">
                    <SignUp 
                        routing="path"
                        path="/sign-up"
                        signInUrl="/sign-in"
                        redirectUrl="/"
                    />
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;