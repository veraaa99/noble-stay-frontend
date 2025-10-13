import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
// import App from './App.tsx'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home.tsx'
import SearchResults from './pages/SearchResults.tsx'
import Details from './pages/Details.tsx'
import NotFound from './pages/NotFound.tsx'
import BookingLayout from './layouts/BookingLayout.tsx'
import PlaceBooking from './pages/PlaceBooking.tsx'
import BookingConfirmed from './pages/BookingConfirmed.tsx'
import UserLayout from './layouts/UserLayout.tsx'
import Profile from './pages/Profile.tsx'

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
      },

      {
        element: <UserLayout />,
        children: [
          {
            path: 'profile',
            element: <Profile />
          }
        ]
      }

    ]
  },
  {
    element: <BookingLayout />,
    children: [
      {
        path: 'book',
        element: <PlaceBooking />
      },
      {
        path: 'confirmed',
        element: <BookingConfirmed />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)