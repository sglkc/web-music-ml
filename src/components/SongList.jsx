import { useContext } from 'react'
import { OptionContext } from '../func/Reducer'
import Song from './Song'

export default function SongList({ songs }) {
  const { options } = useContext(OptionContext)

  return (
    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>Title</th>
          <th>Artist</th>
          <th>URL</th>
          { options.iamge && <th>Image</th> }
          <th>Length</th>
          <th>Tempo</th>
          <th>Key</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        { songs.map((data, i) => <Song key={i} no={i+1} {...data} />) }
      </tbody>
    </table>
  )
}
