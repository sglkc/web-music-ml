import { useContext, useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import { Context } from '../func/Reducer'
import clusterize from '../lib/node-kmeans'

const quadraticDropOff = (e1, e2) => (1 / Math.pow(e1 - e1, 2))

export default function Clustering() {
  const [data, setData] = useState(false)
  const { reducer } = useContext(Context)
  const { songs } = reducer;

  const vectors = new Array()
  for (let i = 0; i < songs.length; i++) {
    vectors[i] = [ songs[i]['popularity'], songs[i]['energy'] ]
  }

  useEffect(() => {
    clusterize(vectors, { k: 4 }, (_, res) => {
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

      console.log(res)
      console.log(series)

      setData(series)
    })
  }, [])

  return (
    <>
      <h1 className="font-bold text-xl">K-Means Clustering</h1>
      { data &&
      <Plot
        data={data}
        layout={{
          margin: {
            b: 0,
            t: 0
          },
          modebar: {
            remove: [
              'autoscale', 'lasso', 'zoom', 'zoomin', 'zoomout', 'reset', 'pan',
              'select'
            ]
          }
        }}
      />
      }
    </>
  )
}
