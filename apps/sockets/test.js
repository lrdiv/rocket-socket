export default class {
  constructor(server) {
    this.server = server
    this.server.io.route('livestream', {
      list(req,res) {
        req.socket.emit('hello', 'world')
        res.json("Hi Livestream!")
      }
    });
  }
}
