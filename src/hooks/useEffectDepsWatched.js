import {useEffect} from 'react'
import usePreviousValue from 'hooks/usePreviousValue'

const useEffectDepsChanged = (callback, dependencies, dependencyNames = []) => {
  const prevDeps = usePreviousValue(dependencies, [])

  const changedDeps = dependencies.reduce((total, dep, index) => {
    if (dep !== prevDeps[index]) {
      const keyName = dependencyNames[index] || index

      total = {
        ...total,
        [keyName]: {
          before: prevDeps[index],
          after: dep
        }
      }
    }

    return total
  }, {})

  // eslint-disable-next-line
  useEffect(() => callback(changedDeps), dependencies)
}

export default useEffectDepsChanged
