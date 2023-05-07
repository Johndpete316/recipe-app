import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const LogoutButton: React.FC = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() => logout({ returnTo: window.location.origin })}
      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
