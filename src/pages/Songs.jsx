import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import axios from 'axios'

const metadata = [
  'Popularity', 'Energy', 'Speechiness', 'Instrumentalness', 'Danceability',
  'Positiveness', 'Liveness'
]

export default function SongsPage() {
  const [data, setData] = useState({})
  const [params, setParams] = useSearchParams()

  useEffect(() => {
    const id = params.get('id')

    axios.get('/api/songs/' + (id ? `${id}` : 'form'))
      .then(({ data }) => setData(data))
      .catch(alert)
  }, [params])

  const submit = (e) => {
    e.preventDefault()

    const id = params.get('id')
    const method = axios[id ? 'patch' : 'post']

    method(
      `/api/songs${id ? '/' + id : ''}`,
      e.target,
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(() => {
        alert('success')
        e.target.reset()
      })
      .catch(alert)
  }

  return (
    <>
      <Navbar />
      <h1 className="font-bold text-lg text-center">Songs CRUD</h1>
      <p className="mt-2 text-md text-center">Gunakan tabel di halaman utama untuk perbarui dan hapus!</p>
      <div className="mt-4 mb-16 flex flex-col justify-center gap-8">
        <form className="mx-auto min-w-1/3 flex flex-col gap-2" onSubmit={submit}>
          <h1 className="font-bold">Basic Info</h1>
          <input
            className="p-2 b-2 rounded-2"
            name="title"
            placeholder="Song Title"
            defaultValue={data.song?.title}
            maxLength="64"
            autoComplete="off"
            required
          />
          <select
            className="p-2 b-2 rounded-2"
            name="artist_id"
            placeholder="Artist Name"
            defaultValue={data.song?.artist_id}
            required
          >
            <option selected={!data.song} disabled={true} hidden={true}>Artist</option>
            { data.artists && data.artists.map((a) => (
              <option key={a.artist_id} value={a.artist_id}>
                { a.artist_id } - { a.name }
              </option>
            ))}
          </select>
          <input
            className="p-2 b-2 rounded-2 text-sm"
            name="spotify_url"
            placeholder="Spotify URL"
            defaultValue={data.song?.spotify_url}
            maxLength="128"
            autoComplete="off"
          />
          <input
            className="p-2 b-2 rounded-2 text-sm"
            name="image_url"
            placeholder="Image URL"
            defaultValue={data.song?.image_url}
            maxLength="128"
            autoComplete="off"
          />
          <select
            className="p-2 b-2 rounded-2"
            name="language_code"
            placeholder="Language"
            defaultValue={data.song?.language_code}
            required
          >
            <option selected={!data.song} disabled={true} hidden={true}>Language</option>
            { data.languages && data.languages.map((l) => (
              <option key={l.language_code} value={l.language_code}>
                {l.language_code} - { l.country }
              </option>
            ))}
          </select>
          <input
            className="p-2 b-2 rounded-2"
            name="genres"
            placeholder="Genres"
            defaultValue={data.song?.genres?.join(',')}
            autoComplete="off"
            required
          />

          <h2 className="mt-2 font-bold">Metadata</h2>
          <input
            className="p-2 b-2 rounded-2"
            name="skey"
            placeholder="Song Key"
            defaultValue={data.song?.skey}
            autoComplete="off"
            maxLength="16"
            required
          />
          <input
            className="p-2 b-2 rounded-2"
            name="length"
            placeholder="Length (mm:ss)"
            defaultValue={data.song?.length}
            maxLength="5"
            pattern="\d{2}:\d{2}"
            title="mm:ss"
            autoComplete="off"
            required
          />
          <label className="relative grid grid-cols-2">
            <span>Tempo</span>
            <input
              className="mr-8"
              type="range"
              min="20"
              max="150"
              step="1"
              name="tempo"
              autoComplete="off"
              value={data.song?.tempo}
              onChange={({ target }) => setData({
                ...data,
                song: {
                  ...data.song,
                  tempo: parseInt(target.value)
                }
              })}
            />
            <span className="absolute right-0">
              { data.song?.tempo || 20 }
            </span>
          </label>
          { metadata.map((info, i) => (
            <label className="relative grid grid-cols-2" key={i}>
              <span>{ info }</span>
              <input
                className="mr-8"
                type="range"
                min="0"
                max="100"
                step="1"
                name={info.toLowerCase()}
                value={data.song?.[info.toLowerCase()]}
                onChange={({ target }) => setData({
                  ...data,
                  song: {
                    ...data.song,
                    [info.toLowerCase()]: parseInt(target.value)
                  }
                })}
              />
              <span className="absolute right-0">
                { data.song?.[info.toLowerCase()] || 0 }
              </span>
            </label>
          ))}
          <div className="mt-2 flex gap-2">
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
