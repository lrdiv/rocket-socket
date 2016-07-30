import Post from './models/post'

export default class {
  constructor(server) {
    this.server = server
    this.server.io.route('posts', {
      list(req,res) {
        Post.run().then(function(posts) {
          res.json(posts);
        });
      },
      create(req, res) {
        let post = new Post({
          title: req.data.title,
          content: req.data.content
        })
        post.saveAll().then(function(result) {
          res.json(result);
        })
      }

    });
  }
}
