const {authenticate} = require('../../middleware/authenticate')
const User = require('../../models/User')

module.exports = (app, db) => {

  // AUTHENTICATION

  app.post('/users/register', (req, res) => {
    db.users.create ({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username
    })
      .then (user => {
        return user.generateAuthToken()
          .then(token => {
            return {'token': token, 'user': user}
          })
      })
      .then (token => res.set('x-auth', token.token.token).json(token.user))
      .catch (e => {
        return res.status(400).json(e);
      });
  });

  app.post('/users/login', (req, res) => {
    db.users.findByCredentials(req.body.username, req.body.password)
      .then(user => {
        return db.tokens.destroy ({
          where: { user_id: user.id }
        })
          .then(token => user.generateAuthToken())
          .then(token => {
            return {'token': token, 'user': user};
          })
      })
      .then(tkn => res.set('x-auth', tkn.token.token).json(tkn.user))
      .catch(e => res.status(400).send())
  })



  // DELETE

  app.delete('/users/delete/:id', (req, res) => {
    db.users.destroy ({
      where: { id: req.params.id }
    })
      .then (post => res.status(200).send())
      .catch (e => res.status(400))
  })



  // UPDATE

  app.patch('/users/update/username', (req, res) => {
    db.users.update (
      { where: { id: req.body.user_id } },
      { username: req.body.username }
    )
      .then (user => res.status(200).send())
      .catch (e => res.status(400))
  })

  app.patch('/users/update/profileImage', (req, res) => {
    db.users.update (
      { where: { id: req.body.user_id } },
      { profileImageUrl: req.body.profileImageUrl }
    )
      .then (user => res.status(200).send())
      .catch (e => res.status(400))
  })


  // RETREIVE

  app.get('/users/:id', (req, res) => {
    db.users.findOne ({
      where: {
        id: { $eq: req.params.id }
      }
    })
      .then (user => res.status(200).json(user))
      .catch (e => res.status(400).json(e))
  })

  app.get('/users/newer/:id', (req, res) => {
    db.users.findAll ({
      order: [
        ['id', 'DESC']
      ],
      where: {
        id: { $gt: req.params.id }
      },
      limit: 30
    })
      .then (users => res.status(200).json(users))
      .catch (e => res.status(400).json(e))
  })

  app.get('/users/older/:id', (req, res) => {
    db.users.findAll ({
      order: [
        ['id', 'DESC']
      ],
      where: {
        id: { $lt: req.params.id }
      },
      limit: 30
    })
      .then (users => res.status(200).json(users))
      .catch (e => res.status(400).json(e))
  })

  app.get('/users/find/:username', (req, res) => {
    db.users.findAll ({
      where: {
        username: { $like: `%${req.params.username}%` }
      },
      limit: 30
    })
      .then (users => res.status(200).json(users))
      .catch (e => res.status(400).json(e))
  })

}
