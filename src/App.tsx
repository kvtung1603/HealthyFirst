import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserHistory } from 'history';
import { ReactQueryDevtools } from 'react-query/devtools';

import { config } from 'config';
import { PRODUCTION } from 'constants/common';

import RootComponent from 'wrappers/Root';
import CustomRouter from 'wrappers/CustomRouter';

export const history = createBrowserHistory();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 12 * 60 * 1000,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CustomRouter history={history}>
        {/* Thử dùng thẳng luôn BrowserRouter */}
        <Suspense fallback={null}>
          <RootComponent />
        </Suspense>
      </CustomRouter>
      {config.APP_ENV !== PRODUCTION && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
