import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import App from './App.tsx'
import 'semantic-ui-css/semantic.min.css';

import { Auth0Provider } from '@auth0/auth0-react'
import { domain, clientId } from '../config.json'

import ErrorPage from './components/error-page'

// address possible XSS issues with using localstorage
// https://auth0.com/docs/libraries/auth0-single-page-app-sdk#change-storage-options

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />
  }
])

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
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>,
)
