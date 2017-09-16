const parseLinkHeader = require('parse-link-header')
const formatLinkHeader = require('format-link-header')

const store = response => val => {
  if (!val) {
    const str = response.get('Link')
    return str ? parseLinkHeader(str) : {}
  } else {
    const str = formatLinkHeader(val)
    return response.set('Link', str)
  }
}

module.exports = response => {
  const handler = {
    set (ctx, rel, url) {
      const obj = ctx()

      const val = typeof url === 'string' ? { rel, url } : url

      obj[rel] = val

      if (!val) delete obj[rel]

      ctx(obj)

      return true
    },
    get (ctx, rel) {
      const obj = ctx()
      return obj[rel]
    },
    deleteProperty (ctx, rel) {
      this.set(ctx, rel, null)
      return true
    }
  }

  return new Proxy(store(response), handler)
}
