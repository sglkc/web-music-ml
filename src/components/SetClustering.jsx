import { useContext } from 'react'
import { Context } from '../func/Reducer'
import cluster from 'set-clustering'
import clusterize from '../lib/node-kmeans'

const quadraticDropOff = (e1, e2) => (1 / Math.pow(e1 - e1, 2))

export default function Clustering() {
  const { reducer } = useContext(Context)
  const { songs } = reducer;
  const c = cluster(songs, (x, y) => {
    let score = 0

    x.genre.forEach((tx) => {
      y.genre.forEach((ty) => {
        if (tx == ty) score += 1
      })
    })

    if (
      x.artist === y.artist ||
      x.language === y.language
    ) score += 1

    return score
  })

  const vectors = new Array()
  for (let i = 0; i < songs.length; i++) {
    vectors[i] = [ songs[i]['popularity'], songs[i]['energy'] ]
  }

  const b= clusterize(vectors, { k: 4 }, console.log)

  const clusterSong = () => console.log(c)

  return (
    <button
      className="px-4 py-2 bg-green-400 rounded-2"
      onClick={clusterSong}
    >
      Cluster songs
    </button>
  )
}
