export const func = x => typeof x === 'function'

export const oneOf = (...args) => x => (args || []).some(y => x === y)
