import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import router from './routes/router'
import './main.css'
import { ArticleProvider } from './context/ArticleContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ArticleProvider>
      <RouterProvider router={router} />
    </ArticleProvider>
  </StrictMode>,
)
