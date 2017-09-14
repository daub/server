module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    const message = err.message && err.message.toLowerCase()

    console.log(err)

    ctx.status = 401
  }
}
