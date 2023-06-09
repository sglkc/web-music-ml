import { useContext } from 'react'
import { Context } from '../func/Reducer'

export default function TableOptions() {
  const { dispatch, reducer } = useContext(Context)

  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-xl font-semibold text-center">Table Options</h2>
      <label>
        <input
          type="checkbox"
          defaultChecked={false}
          onChange={() => dispatch({ ...reducer, embed: !reducer.embed })}
        />
        <span> Toggle song embed</span>
      </label>
      <label>
        <input
          type="checkbox"
          defaultChecked={false}
          onChange={() => dispatch({ ...reducer, image: !reducer.image })}
        />
        <span> Show song images</span>
      </label>
      <label>
        <input
          type="checkbox"
          defaultChecked={false}
          onChange={() => dispatch({ ...reducer, metadata: !reducer.metadata})}
        />
        <span> Show song metadata</span>
      </label>
    </div>
  )
}
