import { useAuth0 } from "@auth0/auth0-react";
import React from 'react';

const Profile: React.FC = () => {

    const { user, isAuthenticated, isLoading } = useAuth0();


    if (isLoading || !user) {
        return <div>Loading ...</div>
    }

    return (
        isAuthenticated ? (
          <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        ) : (
            <div>
                <h2>Not Logged In</h2>
            </div>
        )
    )

}

export default Profile;