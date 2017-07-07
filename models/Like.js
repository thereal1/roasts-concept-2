module.exports = (sequelize, DataTypes) => {

  const Like = sequelize.define('like', {
    post_id: {
      type: DataTypes.INTEGER,
      notNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      notNull: true
    }
  }, {
    paranoid: false,
    underscored: true,
    tableName: 'likes'
  })

  return Like
}
