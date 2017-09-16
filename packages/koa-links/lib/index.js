const delegate = require('delegates')

const parseLink = require('parse-link-header')
const formatLink = require('format-link-header')

const createProxy = (response) => {
  const proto = {
    get links () {
      return parseLink(response.get('Link')) || {}
    },
    set links (obj) {
      response.remove('Link')
      return response.set('Link', formatLink(obj))
    }
  }

  const handler = {
    set (ctx, prop, value) {
      const obj = ctx.links

      obj[prop] = typeof value === 'string'
        ? {
          rel: prop,
          url: value
        }
        : value

      ctx.links = obj

      return true
    },
    get (ctx, prop) {
      const obj = ctx.links

      return obj[prop]
    },
    deleteProperty (ctx, prop) {
      const obj = ctx.links

      delete obj[prop]

      ctx.links = obj
      return true
    }
  }

  return new Proxy(proto, handler)
}

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
