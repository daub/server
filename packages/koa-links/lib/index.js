const parseLink = require('parse-link-header')
const formatLink = require('format-link-header')

const createProxy = (response) => {
  const handler = {
    set (obj, prop, value) {
      const linkStr = response.get('Link')
      const linkObj = parseLink(linkStr) || {}

      linkObj[prop] = typeof value === 'string'
        ? {
            rel: prop,
            url: value
          }
        : value

      response.set('Link', formatLink(linkObj))

      return true
    },
    get (obj, prop) {
      const linkStr = response.get('Link')
      const linkObj = parseLink(linkStr) || {}

      return linkObj[prop]
    }
  }

  return new Proxy({}, handler)
}

module.exports = () => {
  return function (ctx, next) {
    const { response } = ctx

    Object.defineProperty(response, 'links', {
      get: function () {
        return createProxy(this)
      },
      set: function (obj) {
        const links = createProxy(this)

        for (let prop in obj) {
          links[prop] = obj[prop]
        }
      }
    })

    return next()
  }
}
