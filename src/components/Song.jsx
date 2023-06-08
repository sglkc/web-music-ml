import { useContext } from 'react'
import { Context } from '../func/Reducer'

const Td = (props) => <td className="p-2" {...props} />

export default function Song(props) {
  const { reducer } = useContext(Context)

  return (
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
      <Td>{ props.length }</Td>
      <Td>{ props.tempo }</Td>
      <Td>{ props.skey }</Td>
      <Td>
        <button>Metadata</button>
        <button>Similar</button>
      </Td>
    </tr>
  )
}
