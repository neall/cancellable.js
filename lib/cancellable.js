const cancellable = () => {
  let rejects = []
  let error

  const originalC = (p) => new Promise((resolve, reject) => {
    rejects.push(reject)
    p.then(resolve, reject)
  })
  const finalC = () => Promise.reject(error)
  let currentC = originalC
  const c = (p) => currentC(p)

  const originalCancel = (message) => {
    error = (typeof message === 'string') ? Error(message) : message
    rejects.forEach((reject) => reject(error))
    rejects = undefined
    currentC = finalC
    currentCancel = finalCancel
  }
  const finalCancel = () => {}
  let currentCancel = originalCancel
  const cancel = (message) => currentCancel(message)

  return Object.assign(c, { cancel })
}

module.exports = cancellable
