((callback) => {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
    callback()
  } else {
    document.addEventListener('DOMContentLoaded', callback)
  }
})(() => {
  app.initModule(document.getElementById('app'))
})
