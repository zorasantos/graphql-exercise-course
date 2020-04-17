const db = require('../../config/db')

module.exports = {
    perfis(user) {
        return db('perfis')
            .join(
                'users_perfis',
                'perfis.id',
                'users_perfis.perfil_id'
            )
            .where({ user_id: user.id })
    }
}