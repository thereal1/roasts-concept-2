const {authenticate} = require('../../middleware/authenticate')

module.exports = (app, db) => {



  // CREATE

  app.post('/comment', (req, res) => {
    db.comments.create ({
      user_id: req.body.user_id,
      post_id: req.body.post_id,
      text: req.body.text
    })
      .then (post => res.status(200).send())
      .catch (e => res.status(400))
  })



  // DELETE

  app.delete('/comments', (req, res) => {
    db.comments.destroy ({
      where: {
        id: req.body.id
      }
    })
      .then (post => res.status(200).send())
      .catch (e => res.status(400))
  })



  // RETREIVE

  app.get('/comments/:post_id', (req, res) => {
    db.comments.findAll ({
      where: { id: req.params.post_id }
    })
      .then (comments => res.status(200).json(comments))
      .catch (e => res.status(404))
  })

  app.get('/comments/count/:post_id', (req, res) => {
    db.comments.count ({
      where: { id: req.params.post_id }
    })
      .then (count => res.status(200).json(count))
      .catch (e => res.status(404))
  })

}
