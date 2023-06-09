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
        <label className="ms-4" key={i}>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            defaultValue={reducer.info[info.toLowerCase()]}
            onChange={({ target }) => dispatch({
              ...reducer,
              info: {
                ...reducer.info,
                [info.toLowerCase()]: parseFloat(target.value)
              }
            })}
          />
          <span className="mx-2">{ info }</span>
          <span className="absolute">
            { (reducer.info[info.toLowerCase()] * 100).toPrecision(3) }%
          </span>
        </label>
      ))}
    </div>
  )
}

