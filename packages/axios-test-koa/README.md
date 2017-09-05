# axios-server

Run Axios with `net.Server` under the hood. Good for isolated tests.


## Usage

```js
const Axios = require('axios-server')

const app = require('./app.js') // Express app

const request = new Axios(app)

request.get('/')
  .then(res => {
    console.log(res.status === 200)
  })
```


## Installation

Install using npm

```sh
$ npm install axios-server
```


## License

MIT 
