import User from '../models/user'

export default class {
  constructor(server) {
    this.server = server
    this.server.io.route('auth', {
      login(req, res) {
        let u = req.data.identification
        let p = req.data.password
        User.filter({username: u}).run().then(function(users) {
          let user = users[0];
          if (user && user.password != p) {
            user = null
          }

          if (!user) {
            res.json({cod: 401, status: 'error', error: 'Invalid Username'})
          }
          else {
            req.socket.handshake.session.token = user.token;
            res.json({code: 200, status: 'ok', token: user.token});
          }
        });
      },
      authSession(req, res) {
        let token = req.data.token;
        User.filter({token: token}).run().then(function(users) {
          if (users[0]) {
            req.socket.handshake.session.token = token;
            res.json({code: 200, status: 'ok'});
          }
          else {
            res.json({code: 401, status: 'error', error: 'Invalid Token.'})
          }
        });
      }
    })
  }
}
