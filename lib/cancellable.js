const cancellable = () => {
  const rejects = []
  return Object.assign(
    (p) => new Promise((resolve, reject) => {
      rejects.push(reject)
      p.then(resolve, reject)
    }),
    {
      cancel: (message) => {
        const error =
          (typeof message === 'string') ? Error(message) : message
        rejects.forEach((reject) => reject(error))
      }
    }
  )
}

module.exports = cancellable
