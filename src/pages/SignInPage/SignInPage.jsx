import { SignIn } from '@clerk/clerk-react';
import './SignInPage.css';

const SignInPage = () => {
    return (
        <div className="signin-page">
            <div className="container">
                <div className="signin-container">
                    <SignIn 
                        routing="path"
                        path="/sign-in"
                        signUpUrl="/sign-up"
                        redirectUrl="/"
                    />
                </div>
            </div>
        </div>
    );
};

export default SignInPage;