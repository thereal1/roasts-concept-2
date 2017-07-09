const {authenticate} = require('../../middleware/authenticate')

module.exports = (app, db) => {

  // CREATE

  app.post('/likes', (req, res) => {
    db.likes.create ({
      post_id: req.body.post_id,
      user_id: req.body.user_id
    })
      .then (post => res.status(200).send())
      .catch (e => res.status(400))
  })



  // DELETE

  app.delete('/likes', (req, res) => {
    db.likes.destroy ({
      where: {
        post_id: req.body.post_id,
        user_id: req.body.user_id
      }
    })
      .then (post => res.status(200).send())
      .catch (e => res.status(400))
  })



  // RETREIVE

  app.get('/likes/hasLiked/:post_id/:id', (req, res) => {
    db.sequelize.query(`SELECT * FROM likes WHERE id = ${req.params.post_id} AND user_id = ${req.params.id}`)
      .then (likes => {
        if (likes.count > 0) {
          res.status(200).json({'value': true})
        } else {
          res.status(200).json({'value': false})
        }
      })
  })

  app.get('/likes/:post_id', (req, res) => {
    db.likes.findAll ({
      where: { post_id: req.params.post_id },
      limit: 50
    })
      .then (likes => res.status(200).json(likes))
      .catch (e => res.status(404))
  })

  app.get('/likes/count/:post_id', (req, res) => {
    db.likes.count ({
      where: { post_id: req.params.post_id }
    })
      .then (count => res.status(200).json(count))
      .catch (e => res.status(404))
  })

  app.get('/likes/update/:lowest_post_id', (req, res) => {
    db.sequelize.query(`SELECT posts.id, array_agg(likes.user_id) AS likersids FROM posts LEFT JOIN likes ON likes.post_id = posts.id WHERE posts.id >= ${req.params.lowest_post_id} GROUP BY posts.id ORDER BY posts.id DESC`)
      .then (likes => res.status(200).json(likes))
      .catch (e => res.status(404))
  })

}
