import User from './apps/sockets/models/user'

let u = new User({
  username: 'testuser',
  password: 'test123'
});

u.saveAll().then(function(record) {
  console.log(record);
});
