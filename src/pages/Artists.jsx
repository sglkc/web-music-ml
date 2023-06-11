import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'
import Navbar from '../components/Navbar'

dayjs.extend(RelativeTime)

const Th = (props) => (<th className="p-2 sticky top-0 bg-gray-100 z-1" {...props} />)
const Td = (props) => (<td className="p-2" {...props} />)

export default function ArtistsPage() {
  const [artists, setArtists] = useState([])
  const [artist, setArtist] = useState(null)
  const [update, setUpdate] = useState(true)
  const [params, setParams] = useSearchParams()

  useEffect(() => {
    if (!update) return
    axios.get('/api/artists')
      .then(({ data }) => setArtists(data))
      .catch(alert)
      .finally(() => setUpdate(false))
  }, [update])
/*
  useEffect(() => {
    const id = params.get('id')

    if (!id) return

    setArtist()

  }, [params])*/

  const submit = (e) => setTimeout(() => {
    setUpdate(true)
    e.target.reset()
  }, 100)

  return (
    <>
      <Navbar />
      <h1 className="font-bold text-lg text-center">Artists CRUD</h1>
      <div className="mt-4 mb-16 flex flex-col justify-center gap-8">
        <iframe className="hidden" id="noredir" name="noredir" />
        <form
          className="mx-auto flex flex-col gap-2"
          action="/api/artists"
          method="post"
          target="noredir"
          onSubmit={submit}
        >
          <input
            className="p-2 b-2 rounded-2"
            name="name"
            placeholder="Artist Name"
            defaultValue={artists.find(a => a.artist_id == params.get('id'))?.name}
            required
          />
          <input
            className="p-2 b-2 rounded-2"
            name="nationality"
            placeholder="Artist Nationality"
            defaultValue={artists.find(a => a.artist_id == params.get('id'))?.nationality}
            required
          />
          <div className="flex gap-2">
            <button
              className="w-full px-4 py-2 rounded-2 bg-green-400"
              type="submit"
            >
              Submit
            </button>
            <button
              className="px-4 py-2 rounded-2 bg-gray-300"
              type="reset"
              onClick={() => setParams()}
            >
              Reset
            </button>
          </div>
        </form>
        <table className="mx-auto">
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Artist Name</Th>
              <Th>Artist Nationality</Th>
              <Th>Created</Th>
              <Th>Last Updated</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            { artists.map((artist, i) => {
              const edit = () => (setParams('?id=' + artist.artist_id))
              const remove = () => {
                if (!confirm(`Hapus artis ${artist.name}?`)) return;

                axios.delete('/api/artists/' + artist.artist_id)
                  .then(() => {
                    artists.splice(i, 1);
                    setArtists([ ...artists ])
                    alert(`Artis ${artist.name} telah dihapus`)
                  })
                  .catch((err) => {
                    alert('Gagal menghapus, pastikan lagu artis sudah dihapus ' + err)
                  })
              }

              return (
                <tr key={i}>
                  <Td>{ artist.artist_id }</Td>
                  <Td>{ artist.name }</Td>
                  <Td>{ artist.nationality }</Td>
                  <Td>{ dayjs(artist.created_at).format('DD/MM/YYYY hh:mm:ss') }</Td>
                  <Td>{ dayjs(artist.updated_at).fromNow() }</Td>
                  <Td>
                    <button className="mr-2 i-im:edit text-green-600" onClick={edit} />
                    <button className="i-im:trash text-red-600" onClick={remove} />
                  </Td>
                </tr>
              )}
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}