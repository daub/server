module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    const { name, errors } = err

    if (name === 'ValidationError') {
      ctx.status = errors.email.reason === 'unique' ? 409 : 422
    } else {
      ctx.status = 401
    }

    ctx.body = errors || {}
  }
}
