import Thinky from '../../db/connection'
import UUID from 'node-uuid'

let model = Thinky.createModel("User", {
  id: Thinky.type.string(),
  username: Thinky.type.string(),
  password: Thinky.type.string(),
  token: Thinky.type.string()
});

model.pre('save', function(next) {
  if (!this.token) {
    this.token = UUID.v4();
  }
  next();
});

model.pre('save', function(next) {
  let self = this;
  model.filter({username: this.username}).run().then(function(users) {
    if (users[0] && users[0].id != self.id) {
      next(new Error("This username is already in use."));
    }
    else {
      next();
    }
  });
});


export default model;
