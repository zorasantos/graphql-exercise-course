const db = require('../../config/db')

module.exports = {
    users(perfil) {
        return db('users')
            .join(
                'users_perfis',
                'users.id',
                'users_perfis.user_id'
            )
            .where({ perfil_id: perfil.id })
    }
}