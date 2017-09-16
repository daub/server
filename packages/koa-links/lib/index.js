const delegate = require('delegates')

const createProxy = require('./create-proxy')

module.exports = () => {
  return function (ctx, next) {
    const { response } = ctx

    Object.defineProperty(response, 'links', {
      get: function () {
        return createProxy(this)
      },
      set: function (obj) {
        this.remove('Link')

        const links = createProxy(this)
        for (let prop in obj) {
          links[prop] = obj[prop]
        }
      }
    })

    delegate(ctx, 'response')
      .access('links')

    return next()
  }
}
