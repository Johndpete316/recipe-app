import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  // call api to upsert user

  return (
    <button
      onClick={() => loginWithRedirect()}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
    >
      Login
    </button>
  );
};

export default LoginButton;
