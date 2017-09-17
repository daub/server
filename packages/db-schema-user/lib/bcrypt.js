const bcrypt = require('bcrypt-nodejs')

async function encrypt (password) {
  const fn = (resolve, reject) => {
    const callback = (err, hash) =>
      err ? reject(err) : resolve(hash)
    bcrypt.hash(password, null, null, callback)
  }
  return new Promise(fn)
}

async function compare (password, hash) {
  const fn = (resolve, reject) => {
    const callback = (err, res) =>
      err ? reject(err) : resolve(res)
    bcrypt.compare(password, hash, callback)
  }
  return new Promise(fn)
}

module.exports = {
  encrypt,
  compare
}
