import { UserProfile } from '@clerk/clerk-react';
import './ProfilePage.css';

const ProfilePage = () => {
    return (
        <div className="profile-page">
            <div className="container">
                <div className="profile-container">
                    <UserProfile 
                        routing="path"
                        path="/profile"
                    />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;