const assert = require('assert')
const cancellable = require('../../lib/cancellable')

var c

module.exports = {
  cancellable: {
    'returns a function': {
      beforeEach: () => {
        c = cancellable()
      },
      'that returns a promise': {
        'that will fulfill when the passed promise fulfills': () => {
          const expected = Symbol('expected value')
          const result = c(Promise.resolve(expected))

          return result
            .then((v) => { assert.equal(v, expected) })
        },
        'that will reject when the passed promise rejects': () => {
          const expectedError = Error('expected')
          const result = c(Promise.reject(expectedError))

          return result
            .then(() => { throw Error('promise fulfilled unexpectedly') })
            .catch((e) => { assert.equal(e, expectedError) })
        },
        'that will reject when `.cancel(...)` is called': () => {
          let resolve
          const result = c(new Promise((r) => resolve = r))
          const message = 'we are canceling'

          c.cancel(message)
          resolve('already canceled, so this should have no effect')

          return result
            .then(
              (v) => {
                throw Error(`promise fulfilled unexpectedly with: "${v}"`)
              },
              (e) => { assert.equal(e.message, message) }
            )
        },
      },
    },
  },
}
