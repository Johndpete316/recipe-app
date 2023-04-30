import { useAuth0 } from "@auth0/auth0-react";
import { Button } from 'semantic-ui-react'
import React from 'react';

const LogoutButton: React.FC = () => {
    const { logout } = useAuth0();

    return (
        <Button onClick={() => logout({ logoutParams: {returnTo: window.location.origin} })}>
            Log Out
        </Button>

    )
}

export default LogoutButton;