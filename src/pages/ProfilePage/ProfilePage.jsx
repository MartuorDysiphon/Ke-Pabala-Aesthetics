import { UserProfile } from "@clerk/clerk-react";

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <div className="container">
        <h1>Your Profile</h1>
        <UserProfile />
      </div>
    </div>
  );
};

export default ProfilePage;