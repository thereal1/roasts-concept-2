module.exports = (sequelize, DataTypes) => {

  const Post = sequelize.define('post', {
    user_id: {
      type: DataTypes.INTEGER,
      notNull: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      notNull: true,
      isUrl: true
    }
  }, {
    paranoid: false,
    underscored: true
  })

  return Post
}
