import User from './apps/sockets/models/user'

let u = new User({
  username: 'j-mcnally',
  password: 'test123',
  token: '234902x09f0asdf90'
});

u.saveAll().then(function(record) {
  console.log(record);
});
