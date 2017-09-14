module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    const message = err.message && err.message.toLowerCase()

    if (message === 'not found') {
      ctx.status = 404
    } else {
      const { errors } = err

      ctx.status = errors.email.reason === 'unique' ? 409 : 422

      ctx.body = errors
    }
  }
}
