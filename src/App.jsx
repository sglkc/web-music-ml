import { useReducer } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Context, Reducer } from './func/Reducer'
import ArtistsPage from './pages/Artists'
import SongsPage from './pages/Songs'
import IndexPage from './pages/Index'

const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />
  },
  {
    path: '/songs',
    element: <SongsPage />
  },
  {
    path: '/artists',
    element: <ArtistsPage />
  }
]);

export default function App() {
  const defaults = {
    embed: false,
    image: false,
    metadata: false,
    songs: [],
    info: {
      popularity: 100,
      energy: 0,
      speechiness: 0,
      instrumentalness: 0,
      danceability: 0,
      positiveness: 0,
      liveness: 0
    }
  }

  const [reducer, dispatch] = useReducer(Reducer, defaults)

  return (
    <Context.Provider value={{ reducer, dispatch }}>
      <RouterProvider router={router} />
    </Context.Provider>
  )
}
