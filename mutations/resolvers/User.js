const { perfis } = require('../data/db')

module.exports = {
    perfil(user) {
        const sels = perfis
            .filter(p => p.id === user.perfil_id)
        return sels ? sels[0] : null
    }
}