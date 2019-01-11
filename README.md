# `cancellable()`

`cancellable()` will give you a function that you can use to wrap your promises that you might want to bail out of.

## example

Let's say you are making a few asynchronous calls, and you want the ability to bail out of any of them that are not already completed.
You could do this:

```
const c = cancellable()

c(fetch('http://example.com'))
  .then((r) => c(r.json()))
  .then((value) => console.log(value))

// time passes...

c.cancel("we don't need this anymore")
```

Please note: `cancellable` is good for wrapping any promises, but the `fetch()` API specifically can take an [`AbortSignal`][abortsignal] that you can use in order to cancel requests - more efficiently than `cancellable` would be able to do for you.

[abortsignal]: https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal
