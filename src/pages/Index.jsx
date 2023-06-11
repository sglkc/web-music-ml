import { useContext, useEffect } from 'react'
import axios from 'axios'
import { Context } from '../func/Reducer'
import Clustering from '../components/Clustering'
import Recommender from '../components/Recommender'
import SongList from '../components/SongList'
import TableOptions from '../components/TableOptions'
import RecommendOptions from '../components/RecommendOptions'

export default function Index() {
  const { reducer, dispatch } = useContext(Context)

  useEffect(() => {
    axios.get('/api/songs')
      .then(({ data }) => dispatch({ ...reducer, songs: data }))
      .catch(alert)
  }, [])

  return (
    <div className="pt-4 pb-16 font-sans flex flex-col justify-center items-center gap-8">
      <Clustering />
      <div className="flex md:flex-row flex-col md:gap-16 gap-8">
        <RecommendOptions />
        <div className="flex flex-col gap-4">
          <TableOptions />
          <Recommender />
        </div>
      </div>
      <SongList />
    </div>
  )
}
