import { useReducer, useState } from 'react'
import { Context, Reducer } from './func/Reducer'
import SongList from './components/SongList'
import knn from 'alike'
import dataset from './dataset'

const knnConfig = {
  k: 10,
  weights: {
    popularity: 0.14,
    energy: 0.14,
    speechiness: 0.14,
    instrumentalness: 0.14,
    danceability: 0.14,
    positiveness: 0.14,
    liveness: 0.14
  },
}

const taste = {
  popularity: 0.67,
  energy: 0.75,
  speechiness: 0.03,
  instrumentalness: 0,
  danceability: 0.42,
  positiveness: 0.44,
  liveness: 0.16
}

export default function App() {
  const [songs, setSongs] = useState(dataset)
  const defaults = {
    embed: false,
    image: false,
    songs
  }

  const [reducer, dispatch] = useReducer(Reducer, defaults)

  const recommend = () => {
    setSongs(knn(taste, dataset, knnConfig))
  }

  return (
    <Context.Provider value={{ reducer, dispatch }}>
      <div className="p-8 font-sans flex flex-col justify-center items-center gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-center">Table s</h2>
          <label>
            <input
              type="checkbox"
              defaultChecked={false}
              onChange={() => dispatch({ ...reducer, embed: !reducer.embed})}
            />
            <span> Toggle song embed</span>
          </label>
          <label>
            <input
              type="checkbox"
              defaultChecked={false}
              onChange={() => dispatch({ ...reducer, image: !reducer.image})}
            />
            <span> Show song images</span>
          </label>
        </div>
        <button onClick={recommend}>RECOMMEDN!</button>
        <h1 className="text-xl">Music Recommender</h1>
        <SongList />
      </div>
    </Context.Provider>
  )
}
