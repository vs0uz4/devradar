const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
  async index (req, res) {
    const devs = await Dev.find()

    return res.json(devs)
  },

  async store (req, res) {
    const { github_username: githubUsername, techs, latitude, longitude } = req.body

    let dev = await Dev.findOne({
      github_username: githubUsername
    })

    if (!dev) {
      const apiResponse = await axios.get(`https://api.github.com/users/${githubUsername}`)

      const { name, bio, avatar_url: avatarUrl } = apiResponse.data

      const techsArray = parseStringAsArray(techs)

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }

      dev = await Dev.create({
        github_username: githubUsername,
        name,
        avatar_url: avatarUrl,
        bio,
        techs: techsArray,
        location
      })
    }

    return res.json(dev)
  }
}
