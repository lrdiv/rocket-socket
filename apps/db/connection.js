import Thinky from 'thinky'

let connection = {}

connection = Thinky({
  host: 'localhost',
  port: 28015,
  db: 'rocket_socket'
})


export default connection
