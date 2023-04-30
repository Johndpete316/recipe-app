import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'semantic-ui-css/semantic.min.css';

import { Auth0Provider } from '@auth0/auth0-react'
import { domain, clientId } from '../config.json'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider 
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
