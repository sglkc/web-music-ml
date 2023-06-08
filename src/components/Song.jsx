import { useContext, useState } from 'react'
import { Context } from '../func/Reducer'
import Metadata from './Metadata'

const Td = (props) => (<td className="p-2" {...props} />)

export default function Song(props) {
  const [metadata, setMetadata] = useState(false)
  const { reducer, dispatch } = useContext(Context)

  const similar = () => {
    window.scrollTo(0, 0)
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

  return (
    <>
      <tr>
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
        <Td>
          <div className="flex flex-wrap gap-1">
            { props.genre.map((genre) => <span className="p-1 b-1">{ genre }</span>) }
          </div>
        </Td>
        <Td>{ props.length }</Td>
        <Td>{ props.tempo }</Td>
        <Td>{ props.skey }</Td>
        <Td>
          <div className="flex gap-2 underline underline-from-font">
            <button
              className="text-gray-600"
              onClick={() => setMetadata(!metadata)}
            >
              Metadata
            </button>
            <button className="text-green-800" onClick={similar}>Similar</button>
          </div>
        </Td>
      </tr>
      { (metadata || reducer.metadata) && <Metadata {...props} /> }
    </>
  )
}
