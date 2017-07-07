module.exports = (sequelize, DataTypes) => {

  const Token = sequelize.define('token', {
    access: {
      type: DataTypes.STRING(300),
      notNull: true
    },
    token: {
      type: DataTypes.STRING(300),
      notNull: true
    }
  }, {
    paranoid: false,
    underscored: true
  })

  return Token
}
