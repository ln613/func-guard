import { fg_ } from './fg_'

fg_(x => `${x} is not a number`)
export const num = x => typeof x === 'number'

fg_(x => `${x} is not an integer`)
export const int = x => Number.isInteger(x)

const xyNum = { x: num, y: num }
const xyzNum = { x: num, y: num, z: num }

fg_(
  xyNum,
  x => y => `${y} must be greater than ${x}`
)
export const gt = x => y => y > x

fg_(
  xyNum,
  x => y => `${y} must be greater than or equal to ${x}`
)
export const gte = x => y => y >= x

export const min = gte

fg_(
  xyNum,
  x => y => `${y} must be less than ${x}`
)
export const lt = x => y => y < x

fg_(
  xyNum,
  x => y => `${y} must be less than or equal to ${x}`
)
export const lte = x => y => y <= x

export const max = lte

fg_(
  xyzNum,
  (x, y) => z => `${z} must be between ${x} and ${y}`
)
export const between = (x, y) => z => z >= x && z <= y

fg_(
  { x: int },
  x => `${x} must be an odd number`
)
export const odd = x => x % 2 === 1

fg_(
  { x: int },
  x => `${x} must be an even number`
)
export const even = x => x % 2 === 0
