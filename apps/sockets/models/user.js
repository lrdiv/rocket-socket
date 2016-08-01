import Thinky from '../../db/connection'

export default Thinky.createModel("User", {
  id: Thinky.type.string(),
  username: Thinky.type.string(),
  password: Thinky.type.string(),
  token: Thinky.type.string()
});
