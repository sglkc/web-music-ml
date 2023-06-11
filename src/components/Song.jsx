import { useContext, useState } from 'react'
import axios from 'axios'
import { Context } from '../func/Reducer'
import Metadata from './Metadata'

const Td = (props) => (<td className="p-2" {...props} />)

export default function Song(props) {
  const [metadata, setMetadata] = useState(false)
  const { reducer, dispatch } = useContext(Context)

  const similar = () => {
    document.getElementById('recommender').scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    })

    dispatch({
      ...reducer,
      info: {
        popularity: props.popularity,
        energy: props.energy,
        speechiness: props.speechiness,
        instrumentalness: props.instrumentalness,
        danceability: props.danceability,
        positiveness: props.positiveness,
        liveness: props.liveness
      }
    })
  }

  const edit = () => {}

  const remove = () => {
    if (!confirm(`Hapus lagu ${props.title}?`)) return;

    axios.delete('/api/songs/' + props.song_id)
      .then(() => {
        dispatch({ ...reducer, songs: reducer.songs.splice(props.no, 1) })
        alert(`Lagu ${props.title} sukses telah dihapus`)
      })
      .catch(alert)
  }

  return (
    <>
      <tr className={!metadata ? 'b-b-1' : 'bg-gray-50'}>
        <Td>{ props.no }</Td>
        <Td>{ props.title }</Td>
        <Td>{ props.artist }</Td>
        <Td>
          { reducer.embed ?
            <iframe
              src={props.spotify_url.replace('track/', 'embed/track/')}
              allow="encrypted-media"
              width="100%"
              height="80"
              loading="lazy"
              allowtransparency="true"
            />
            :
            <a className="underline" href={ props.spotify_url }>Spotify</a>
          }
        </Td>
        { reducer.image &&
        <Td>
          <img
            className="aspect-square object-cover transition-transform transition-duration-350 hover:scale-250"
            src={props.image_url}
            width="64"
          />
        </Td>
        }
        <Td>{ props.language }</Td>
        <Td>
          <div className="flex flex-wrap gap-1">
            { props.genre.map((genre, i) => (
              <span className="p-1 b-1" key={i}>{ genre }</span>
            ))}
          </div>
        </Td>
        <Td>{ props.length }</Td>
        <Td>{ props.tempo }</Td>
        <Td>{ props.skey }</Td>
        <Td>
          <div className="flex gap-2 underline underline-from-font">
            <button
              className="i-im:file-audio text-gray-600"
              onClick={() => setMetadata(!metadata)}
            />
            <button className="i-im:search text-blue-600" onClick={similar} />
            <button className="i-im:edit text-green-600" onClick={edit} />
            <button className="i-im:trash text-red-600" onClick={remove} />
          </div>
        </Td>
      </tr>
      { (metadata || reducer.metadata) && <Metadata {...props} /> }
    </>
  )
}
