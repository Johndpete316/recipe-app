import React from 'react';
import { Menu, Button, Image, Icon } from 'semantic-ui-react';
import { useAuth0 } from '@auth0/auth0-react';

import LoginButton from './Auth0/login';
import LogoutButton from './Auth0/logout';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (

    isAuthenticated && !isLoading ? (

    <Menu fixed='top' borderless size="large" style={{ borderRadius: 0 }}>
      <Menu.Item header>
        <Icon name="food" size="large" />
        Recipe App
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          <LogoutButton />
        </Menu.Item>
        <Menu.Item>
          <Image src={user?.picture} avatar as='a'/>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
    ) : (
      <Menu fixed='top' borderless size="large" style={{ borderRadius: 0 }}>
      <Menu.Item header>
        <Icon name="food" size="large" />
        Recipe App
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          <LoginButton />
        </Menu.Item>
        <Menu.Item>
          <Icon name="user circle" size="large" color='teal' />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
    )
  );
};

export default Navbar;
