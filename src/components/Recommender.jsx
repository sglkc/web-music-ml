import { useContext } from 'react'
import { Context } from '../func/Reducer'
import knn from 'alike'

export default function Recommender() {
  const { reducer, dispatch } = useContext(Context)

  const recommend = () => {
    const recommended = knn(reducer.info, reducer.songs)
    dispatch({ ...reducer, songs: recommended })
  }

  return (
    <button
      className="px-4 py-2 bg-green-400 rounded-2"
      onClick={recommend}
    >
      Recommend songs
    </button>
  )
}
