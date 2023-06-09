import { useContext, useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import { Context } from '../func/Reducer'
import clusterize from '../lib/node-kmeans'

const infos = [
  'Popularity', 'Energy', 'Speechiness', 'Instrumentalness', 'Danceability',
  'Positiveness', 'Liveness'
]

export default function Clustering() {
  const [data, setData] = useState(false)
  const [options, setOptions] = useState({
    k: 4,
    popularity: true,
    energy: true,
    speechiness: false,
    instrumentalness: false,
    danceability: false,
    positiveness: false,
    liveness: false
  })

  const { reducer } = useContext(Context)
  const { songs } = reducer;

  useEffect(() => {
    const vectors = []

    songs.forEach((song) => {
      const vector = []

      for (const meta in options) {
        if (options[meta] && meta !== 'k') {
          vector.push(song[meta])
        }
      }

      vectors.push(vector)
    })

    clusterize(vectors, { k: options.k }, (_, res) => {
      const series = []

      res.forEach(({ cluster }, i) => {
        const x = cluster.map((val) => val[0])
        const y = cluster.map((val) => val[1])

        series.push({
          x,
          y,
          mode: 'markers',
          name: 'cluster ' + (i) ,
          legendgroup: 'cluster '+ (i)
        })
      })

      setData(series)
    })
  }, [options])

  return (
    <div>
      <h1 className="font-bold text-center text-xl">K-Means Clustering</h1>
      <div className="flex lg:flex-row flex-col">
        { data &&
        <Plot
          className="mx-auto"
          data={data}
          layout={{
            legend: { y: 0 },
            margin: { b: 32, t: 32 },
            modebar: {
              remove: [
                'lasso', 'zoom', 'zoomin', 'zoomout', 'pan', 'select'
              ]
            },
            xaxis: { range: [0, 100] },
            yaxis: { range: [0, 100] },
            height: 450
          }}
        />
        }
        <div className="lg:px-0 px-16 flex flex-row lg:flex-col lg:flex-wrap-0 flex-wrap justify-center gap-2">
          <label className="lg:pr-0 pr-4 relative flex items-center gap-2">
            <span className="mx-2">Clusters</span>
            <input
              type="range"
              min="2"
              max="10"
              step="1"
              defaultValue={options.k}
              onMouseUp={(e) => setOptions({ ...options, k: e.target.value })}
            />
            <span className="absolute lg:-right-6 right-0">
              { options.k }
            </span>
          </label>
          { infos.map((info, i) => (
            <label className="relative ml-2 flex items-center gap-2" key={i}>
              <input
                type="checkbox"
                defaultChecked={options[info.toLowerCase()]}
                onChange={({ target }) => setOptions({
                  ...options,
                  [info.toLowerCase()]: target.checked
                })}
              />
              <span>{ info }</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
