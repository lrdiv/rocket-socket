import Express from 'express.oi'
import Session from 'express-session'
import SharedSession from 'express-socket.io-session'
import Posts from './routes/posts'
import Auth from './routes/auth'
import PostListener from './listeners/posts'
import Thinky from '../db/connection'



export default class {
  constructor() {
    this.server = Express();
    this.server.use(Express.static('static'));
  }

  start() {
    this.server.http().io();
    this.server.io.session({
      secret: process.env.SECRET || 'this is just a random secret for now',
      resave: false,
      saveUninitialized: true
    });
    let port = process.env.PORT || 3000;
    console.log(`Starting server on ${port}`);
    this.server.listen(port);
    this.mapRoutes();
    this.mapListeners();
  }

  mapRoutes() {
    new Posts(this.server);
    new Auth(this.server);
  }

  mapListeners() {
    new PostListener(this.server)
  }

}
