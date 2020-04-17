const db = require('../../config/db')

module.exports = {
    perfis() {
        return db('perfis')
    },
    perfil(_, { filter }) {
        if(!filter) return null
        const { id, name } = filter
        if(id) {
            return db('perfis')
                .where({ id })
                .first()
        } else if(name) {
            return db('perfis')
                .where({ name })
                .first()
        } else {
            return null
        }
    }
}