import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

import LoginButton from './Auth0/login';
import LogoutButton from './Auth0/logout';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <header className="fixed top-0 w-full bg-white border-b border-gray-300">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-semibold text-gray-700">
              <i className="fas fa-utensils text-lg mr-2"></i>
              Recipe App
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated && !isLoading ? (
              <Menu>
              {({ open }) => (
                <>
                  <Menu.Button className="flex items-center space-x-2">
                    <img
                      src={user?.picture}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <ChevronDownIcon
                      className={`w-6 h-6 ${
                        open ? 'text-blue-600' : 'text-gray-600'
                      }`}
                    />
                  </Menu.Button>
                  <MenuPopover>
                    <Menu.Items
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      static
                    >
                      <MenuItem>
                        <LogoutButton />
                      </MenuItem>
                    </Menu.Items>
                  </MenuPopover>
                </>
              )}
            </Menu>
            ) : (
              <>
                <LoginButton />
                <span className="text-teal-500">
                  <i className="fas fa-user-circle text-2xl"></i>
                </span>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
