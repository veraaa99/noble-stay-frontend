import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import App from './App.tsx'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home.tsx'
import SearchResults from './pages/SearchResults.tsx'
import Details from './pages/Details.tsx'
import NotFound from './pages/NotFound.tsx'

// TODO: Fix UserLayout

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'results',
        element: <SearchResults />
      },
      {
        path: 'results/:castleId',
        element: <Details />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)