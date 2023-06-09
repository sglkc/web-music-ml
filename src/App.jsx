import { useReducer } from 'react'
import { Context, Reducer } from './func/Reducer'
import Clustering from './components/Clustering'
import Recommender from './components/Recommender'
import SongList from './components/SongList'
import TableOptions from './components/TableOptions'
import RecommendOptions from './components/RecommendOptions'
import dataset from './dataset'

export default function App() {
  const defaults = {
    embed: false,
    image: false,
    metadata: false,
    songs: dataset,
    info: {
      popularity: 67,
      energy: 75,
      speechiness: 3,
      instrumentalness: 0,
      danceability: 42,
      positiveness: 44,
      liveness: 16
    }
  }

  const [reducer, dispatch] = useReducer(Reducer, defaults)

  return (
    <Context.Provider value={{ reducer, dispatch }}>
      <div className="pt-4 pb-16 font-sans flex flex-col justify-center items-center gap-8">
        <Clustering />
        <div className="flex gap-16">
          <RecommendOptions />
          <div className="flex flex-col gap-4">
            <TableOptions />
            <Recommender />
          </div>
        </div>
        <SongList />
      </div>
    </Context.Provider>
  )
}
