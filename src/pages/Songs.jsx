import { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Context } from '../func/Reducer'
import Navbar from '../components/Navbar'
import axios from 'axios'

export default function SongsPage() {
  const [song, setSong] = useState({})
  const [params, setParams] = useSearchParams()
  const { reducer, dispatch } = useContext(Context)

  useEffect(() => {
    const id = params.get('id')

    if (!id) return
    if (reducer.songs?.length) {
      return setSong(reducer.songs.find(s => s.song_id == id))
    }

    axios.get('/api/songs/' + id)
      .then(({ data }) => setSong(data))
      .catch(alert)
  }, [params])

  const submit = (e) => setTimeout(() => {
    setUpdate(true)
    e.target.reset()
  }, 100)

  return (
    <>
      <Navbar />
      <h1 className="font-bold text-lg text-center">Songs CRUD</h1>
      <p className="mt-2 text-md text-center">Gunakan tabel di halaman utama untuk perbarui dan hapus!</p>
      <div className="mt-4 mb-16 flex flex-col justify-center gap-8">
        <iframe className="hidden" id="noredir" name="noredir" />
        <form
          className="mx-auto flex flex-col gap-2"
          action="/api/songs"
          method="post"
          target="noredir"
          onSubmit={submit}
        >
          <input
            className="p-2 b-2 rounded-2"
            name="name"
            placeholder="Artist Name"
            defaultValue={song?.title}
            required
          />
          <input
            className="p-2 b-2 rounded-2"
            name="nationality"
            placeholder="Artist Nationality"
            defaultValue={song?.artist}
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
      </div>
    </>
  )
}
