import { useContext } from 'react'
import { Context } from '../func/Reducer'

export default function RecommendOptions() {
  const { dispatch, reducer } = useContext(Context)
  const infos = [
    'Popularity', 'Energy', 'Speechiness', 'Instrumentalness', 'Danceability',
    'Positiveness', 'Liveness'
  ]

  return (
    <div id="recommender" className="flex flex-col gap-1">
      <h2 className="text-xl font-semibold text-center">My Taste</h2>
      <p className="text-center">Silahkan ubah slider sesuai dengan kesukaan</p>
      { infos.map((info, i) => (
        <label className="relative mx-4 flex justify-between" key={i}>
          <span>{ info }</span>
          <input
            className="mr-8"
            type="range"
            min="0"
            max="100"
            step="10"
            defaultValue={reducer.info[info.toLowerCase()]}
            onChange={({ target }) => dispatch({
              ...reducer,
              info: {
                ...reducer.info,
                [info.toLowerCase()]: parseFloat(target.value)
              }
            })}
          />
          <span className="absolute right-0">
            { reducer.info[info.toLowerCase()] }
          </span>
        </label>
      ))}
    </div>
  )
}

