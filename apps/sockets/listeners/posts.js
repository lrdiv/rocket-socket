import Post from '../models/post';
import { Serializer } from 'jsonapi-serializer';

export default class {
  constructor(server) {
    this.server = server;
    let self = this;
    Post.changes().then(function(feed) {
      feed.each(function(error, doc) {
        if (error) {
          console.log(error);
        }

        if (doc.isSaved() === false) {

        } else if (doc.getOldValue() == null) {
          let post = new Serializer('post', { attributes: ['id', 'title', 'content'], pluralizeType: false }).serialize(doc);
          self.server.io.emit('post:create', post);
        }

      });
    });
  }
}
