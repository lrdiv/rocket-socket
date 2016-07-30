import Post from '../models/post'

export default class {
  constructor(server) {
    console.log("HELLO WORLD?")
    this.server = server
    let self = this
    Post.changes().then(function(feed) {
      feed.each(function(error, doc) {
        if (error) {
          console.log(error);
        }

        if (doc.isSaved() === false) {

        } else if (doc.getOldValue() == null) {
          self.server.io.emit('post:create', doc);
        }

      });
    });
  }
}
