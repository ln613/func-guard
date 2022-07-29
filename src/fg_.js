import { fg } from './fg'
import { func } from './lang'

export const fg_ = (guards, errFunc) => (origFunc, params) => {
  if (params.length === 0) return origFunc

  if (func(guards)) {
    errFunc = guards
    guards = undefined
  }

  errFunc && fg(errFunc, func)

  const keys = Object.keys(guards || {})
  const noGuards = keys.length === 0
  const noCurry = params.length === 1

  if (noGuards && noCurry) return setFunc(origFunc, errFunc)

  const newFunc = (...args) => {
    const [ps, ...restParams] = params

    if (!noGuards) {
      ps.forEach((p, i) => {
        const gs = guards[p]
        if (gs) {
          fg(args[i], ...(Array.isArray(gs) ? gs : [gs]))
        }
      })
    }

    const result = origFunc(...args)

    if (noCurry) {
      return result
    } else {
      const newGuards = Object.fromEntries(keys.filter(k => !ps.includes(k)).map(k => [k, guards[k]]))
      const newErrFunc = errFunc && errFunc(...args)
      return fg_(newGuards, newErrFunc)(result, restParams)
    }
  }

  return setFunc(newFunc, errFunc, origFunc.name)
}

const setFunc = (newFunc, errFunc, name) => {
  newFunc.errFunc = errFunc
  name && (newFunc.name = name)
  return newFunc
}