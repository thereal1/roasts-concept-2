const Sequelize = require('sequelize')
const env = require('./env')
const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  dialect: env.DATABASE_DIALECT,
  define: {
    underscored: true
  }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize



db.users = require('../models/User.js')(sequelize, Sequelize)
db.posts = require('../models/Post.js')(sequelize, Sequelize)
db.likes = require('../models/Like.js')(sequelize, Sequelize)
db.comments = require('../models/Comment.js')(sequelize, Sequelize)
db.tokens = require('../models/Token.js')(sequelize, Sequelize)



db.users.hasMany(db.posts, { foreignKey: { onDelete: 'CASCADE' } })
db.posts.belongsTo(db.users)

db.posts.hasMany(db.comments, { foreignKey: { onDelete: 'CASCADE' } })
db.comments.belongsTo(db.posts)

db.posts.hasMany(db.likes, { foreignKey: { onDelete: 'CASCADE' } })
db.likes.belongsTo(db.posts)

db.users.hasMany(db.tokens, { foreignKey: { onDelete: 'CASCADE' } })
db.tokens.belongsTo(db.users)



module.exports = db
