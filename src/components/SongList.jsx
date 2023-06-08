import { useContext } from 'react'
import { Context } from '../func/Reducer'
import Song from './Song'

export default function SongList() {
  const { reducer } = useContext(Context)
  const { songs } = reducer;

  return (
    <>
      <h1 className="text-xl font-bold">Song List</h1>
      <div className="max-h-1/3 max-w-[92ch] overflow-y-auto">
        <table>
          <thead>
            <tr>
              <th className="p-2 sticky top-0 bg-gray-100 z-1">No.</th>
              <th className="p-2 sticky top-0 bg-gray-100 z-1">Title</th>
              <th className="p-2 sticky top-0 bg-gray-100 z-1">Artist</th>
              <th className="p-2 sticky top-0 bg-gray-100 z-1">URL</th>
              { reducer.image &&
              <th className="p-2 sticky top-0 bg-gray-100 z-1">Image</th>
              }
              <th className="p-2 sticky top-0 bg-gray-100 z-1">Lang</th>
              <th className="p-2 sticky top-0 bg-gray-100 z-1">Genres</th>
              <th className="p-2 sticky top-0 bg-gray-100 z-1">Length</th>
              <th className="p-2 sticky top-0 bg-gray-100 z-1">Tempo</th>
              <th className="p-2 sticky top-0 bg-gray-100 z-1">Key</th>
              <th className="p-2 sticky top-0 bg-gray-100 z-1">Action</th>
            </tr>
          </thead>
          <tbody>
            { songs.map((data, i) => <Song key={i} no={i+1} {...data} />) }
          </tbody>
        </table>
      </div>
    </>
)
}
