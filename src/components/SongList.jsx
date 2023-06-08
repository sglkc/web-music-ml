import { useContext } from 'react'
import { Context } from '../func/Reducer'
import Song from './Song'

export default function SongList() {
  const { reducer } = useContext(Context)
  const { songs } = reducer;

  return (
    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>Title</th>
          <th>Artist</th>
          <th>URL</th>
          { reducer.image && <th>Image</th> }
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
