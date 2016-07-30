import Express from 'express.oi'
import Posts from './posts'
import PostListener from './listeners/posts'
import Thinky from '../db/connection'

export default class {
  constructor() {
    this.server = Express();
    this.server.use(Express.static('static'));
  }

  start() {
    this.server.http().io();
    let port = process.env.PORT || 3000;
    console.log(`Starting server on ${port}`);
    this.server.listen(port);
    this.mapRoutes();
    this.mapListeners();
  }

  mapRoutes() {
    new Posts(this.server)
  }

  mapListeners() {
    new PostListener(this.server)
  }

}
