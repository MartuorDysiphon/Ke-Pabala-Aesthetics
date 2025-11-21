import { UserButton, useUser, SignInButton, SignUpButton } from "@clerk/clerk-react";

const UserAuth = () => {
  const { isSignedIn } = useUser();

  if (isSignedIn) {
    return (
      <UserButton 
        appearance={{
          elements: {
            rootBox: "user-button-container",
            userButtonAvatarBox: "w-6 h-6"
          }
        }} 
      />
    );
  }

  return (
    <SignInButton mode="modal" fallbackRedirectUrl="/" signUpForceRedirectUrl="/">
      <button className="nav-icon" aria-label="Sign In">
        <i className="fas fa-user"></i>
      </button>
    </SignInButton>
  );
};

export default UserAuth;