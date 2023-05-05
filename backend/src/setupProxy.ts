import { createProxyMiddleware } from 'http-proxy-middleware';
import { RequestHandler } from 'express';
import { Application } from 'express-serve-static-core';

const configureProxy = (app: Application) => {
  // Proxy requests to /recipes to the Recipe API
  app.use(
    '/recipes',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
      pathRewrite: {
        '^/recipes': '',
      },
    })
  );

  // Proxy requests to /users to the User API
  app.use(
    '/users',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
      pathRewrite: {
        '^/users': '',
      },
    })
  );
};

export default configureProxy;
