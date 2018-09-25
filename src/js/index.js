((fn) => {
  if (document.readyState !== 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
})(() => {
  app.initModule(document.getElementById('app'))
})
