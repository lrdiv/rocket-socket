import Thinky from '../../db/connection'

export default Thinky.createModel("Post", {
  id: Thinky.type.string(),
  title: Thinky.type.string(),
  content: Thinky.type.string()
})
