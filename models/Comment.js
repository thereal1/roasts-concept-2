module.exports = (sequelize, DataTypes) => {

  const Comment = sequelize.define('comment', {
    user_id: {
      type: DataTypes.INTEGER,
      notNull: true
    },
    post_id: {
      type: DataTypes.INTEGER,
      notNull: true
    }
    text: {
      type: DataTypes.STRING,
      notNull: true
    }
  }, {
    paranoid: false,
    underscored: true
  })

  return Comment
}
