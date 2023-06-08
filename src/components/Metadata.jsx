import { useContext } from 'react'
import { Context } from '../func/Reducer'

export default function Metadata(props) {
  const { reducer } = useContext(Context)
  const infos = [
    'Popularity', 'Energy', 'Speechiness', 'Instrumentalness', 'Danceability',
    'Positiveness', 'Liveness'
  ]

  return (
    <tr className="b-b-1">
      <td></td>
      <td className="pb-4" colSpan={reducer.image ? 9 : 8}>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
          { infos.map((info, i) => (
            <label className="relative flex items-center" key={i}>
              <span className="flex-grow">{ info }</span>
              <meter
                className="mr-[5ch]"
                min="0"
                max="1"
                value={props[info.toLowerCase()]}
              />
              <span className="absolute right-0">
                { props[info.toLowerCase()].toFixed(2) }%
              </span>
            </label>
          ))}
        </div>
      </td>
    </tr>
  )
}
