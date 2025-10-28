import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
// import App from './App.tsx'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home.tsx'
import SearchResults from './pages/SearchResults.tsx'
import NotFound from './pages/NotFound.tsx'
import BookingLayout from './layouts/BookingLayout.tsx'
import PlaceBooking from './pages/PlaceBooking.tsx'
import BookingConfirmed from './pages/BookingConfirmed.tsx'
import UserLayout from './layouts/UserLayout.tsx'
import Profile from './pages/Profile.tsx'
import CastleDetails from './pages/CastleDetails.tsx'
import AllCastles from './pages/AllCastles.tsx'
import { CastleListingProvider } from './contexts/CastleListingContext.tsx'
import { UserProvider } from './contexts/UserContext.tsx'
import { BookingProvider } from './contexts/BookingContext.tsx'

const router = createBrowserRouter([
  // TODO: Ändra så att search/:filter visar resultat baserat på filter, och ha en separat path för att visa slottdetaljer (ex. castles/:castleId)
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {

        index: true,
        element: <Home />
      },
      {
        path: 'search',
        element: <SearchResults />
      },
      {
        path: 'castles',
        element: <AllCastles />
      },
      {
        path: 'castles/:castleId',
        element: <CastleDetails />
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
    <CastleListingProvider>
      <UserProvider>
        <BookingProvider>
          <RouterProvider router={router}/>
        </BookingProvider>
      </UserProvider>
    </CastleListingProvider>
  </StrictMode>,
)