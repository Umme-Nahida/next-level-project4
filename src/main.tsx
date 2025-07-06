import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
 import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import {RouterProvider } from 'react-router'
import router from './routes/Routes.tsx'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <div>
        <Toaster position="top-center" />
        <RouterProvider router={router} />
      </div>
    </Provider>,
    
  </StrictMode>,
)
