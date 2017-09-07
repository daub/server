module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    const message = err.message && err.message.toLowerCase()

    if (message === 'not found') {
      ctx.status = 404
    } else {
      ctx.status = 422
      ctx.body = err.errors
    }
  }
}

