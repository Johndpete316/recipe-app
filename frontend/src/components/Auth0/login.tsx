import { useAuth0 } from '@auth0/auth0-react'
import { Button } from 'semantic-ui-react'
import React from 'react'

const LoginButton: React.FC = () => {
    const { loginWithRedirect } = useAuth0()

    // call api to upsert user
    
    

    return (
        <Button onClick={() => loginWithRedirect()}>
            Login
        </Button>
    )
}

export default LoginButton;