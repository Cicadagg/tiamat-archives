import React, { Suspense } from 'react';
import './App.css';
import { AppRouter } from './components/AppRouter';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter  } from 'react-router-dom';
import { QueryClient , QueryClientProvider } from "react-query";
import './i18n';
import { HelmetProvider } from 'react-helmet-async';
const queryClient = new QueryClient();
function App() {
  return (
    // <Suspense fallback="...loading">
    <HelmetProvider>
        <QueryClientProvider client={queryClient} >
        <Provider store={store}>
          <BrowserRouter >
                <AppRouter/>
          </BrowserRouter>
        </Provider>
      </QueryClientProvider>
    </HelmetProvider>
    // </Suspense>
  );
}

export default App;
