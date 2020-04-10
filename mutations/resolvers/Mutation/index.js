const user = require('./User')
const perfil = require('./Perfil')

module.exports = {
    ...user,
    ...perfil
}