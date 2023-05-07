import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'


import { Auth0Provider } from '@auth0/auth0-react'
import { domain, clientId } from '../config.json'

import ErrorPage from './components/error-page'

// address possible XSS issues with using localstorage
// https://auth0.com/docs/libraries/auth0-single-page-app-sdk#change-storage-options


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider 
      domain={domain}
      clientId={clientId}
      cacheLocation='localstorage'
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
