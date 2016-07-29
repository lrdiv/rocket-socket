import Express from 'express.oi'
import Test from './test'

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
    this.mapRoutes()
  }

  mapRoutes() {
    let test = new Test(this.server)
  }

}
