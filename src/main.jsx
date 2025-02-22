import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Routes from './routes/routes.jsx'
import AuthProviders from './Providers/AuthProviders.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProviders>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <div className='max-w-7xl mx-auto'>
            <RouterProvider router={Routes} />
          </div>
        </HelmetProvider>
      </QueryClientProvider>
    </AuthProviders>
  </StrictMode>,
)
