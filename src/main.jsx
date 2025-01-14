import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Routes.jsx'
import { HelmetProvider } from 'react-helmet-async'
import AuthContextProvider from './Providers/AuthContextProvider.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <RouterProvider router={router}>
          </RouterProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </AuthContextProvider>
  </StrictMode>,
)
