export const fg = (arg, ...guards) => {
  const errors = guards.map(g => {
    const r = g(arg)
    if (typeof r === 'boolean') {
      if (!r) {
        return g.errFunc
          ? g.errFunc(arg)
          : `${arg} is not valid`
      }
    }
  }).filter(x => x)

  if (errors.length > 0) {
    throw `errors:\n${errors.join('\n')}`
  }
}
