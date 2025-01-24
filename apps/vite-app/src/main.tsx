import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import { Client, Provider, cacheExchange, fetchExchange } from 'urql';
import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const apiServiceUrl = import.meta.env['VITE_API_SERVICE_URL'] || '';

export const createClient = (): Client => {
  const client = new Client({
    url: `${apiServiceUrl}/graphql`,
    exchanges: [cacheExchange, fetchExchange],
    suspense: true,
  });
  return client;
};

root.render(
  <StrictMode>
    <BrowserRouter>
      <Provider value={createClient()}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
