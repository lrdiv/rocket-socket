import { Errors } from '../../db/connection';
import Post from '../models/post';

export default class {
  constructor(server) {
    this.server = server;
    this.server.io.route('post', {

      list(req,res) {
        let params = {};
        if (req.data && req.data.params) {
          params = req.data.params;
        }
        Post.filter( params ).run().then(function(posts) {
          res.json({code: 200, data: posts});
        }).error((error) => {
          console.log(error);
          res.json({code: 500, data: null, message: error});
        });
      },

      get(req, res) {
        Post.get(req.data.id).run().then((data) => {
          res.json({code: 200, data});
        }).catch(Errors.DocumentNotFound, (error) => {
          res.json({code: 404, data: null, message: error});
        }).error((error) => {
          res.json({code: 500, data: null, message: error});
        });
      },

      create(req, res) {
        console.log("CREATE WAS CALLLED...");
        let post = new Post({
          title: req.data.title,
          content: req.data.content
        });
        post.saveAll().then(function(result) {
          res.json({code: 200, data: result});
        }).error((error) => {
          res.json({code: 500, data: null, message: error});
        });
      },

      update(req, res) {
        Post.get(req.data.id).run().then((data) => {
          data.merge(req.data).save().then((result) => {
            res.json(result);
          });
        }).catch(Errors.DocumentNotFound, (error) => {
          res.json({code: 404, data: null, message: error});
        }).error((error) => {
          res.json({code: 500, data: null, message: error});
        });
      },

      delete(req, res) {
        Post.get(req.data.id).run().then((data) => {
          data.delete().then((result) => {
            res.json({code: 200, data: result});
          });
        }).catch(Errors.DocumentNotFound, (error) => {
          res.json({code: 404, data: null, message: error});
        }).error((error) => {
          res.json({code: 500, data: null, message: error});
        });
      }
    });
  }
}
