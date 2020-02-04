const {
  Router
} = require('express')
const routes = Router()

routes.get('/', (req, res) => {
  return res.json({
    message: 'Enjoy the silence...'
  })
})

module.exports = routes
