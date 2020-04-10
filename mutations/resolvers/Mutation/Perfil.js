const { perfis, nextId } = require('../../data/db')

function indexPerfil(filter) {
    if(!filter) return -1
    const { id, name } = filter
    if(id) {
        return perfis
            .findIndex(p => p.id === id)
    } else if(name) {
        return perfis
            .findIndex(p => p.name === name)
    }
    return -1
}

module.exports = {
    newPerfil(_, { data }) {
        const nameExist = perfis
            .some(p => p.name === data.name)
        if(nameExist) {
            throw new Error('Perfil ja cadastrado!')
        }
        const novo = {
            id: nextId(),
            ...data
        }

        perfis.push(novo)
        return novo
    },

    deletePerfil(_, { filter }) {
        const i = indexPerfil(filter)
        if(i < 0) return null
        const deleted = perfis.splice(i, 1)
        return deleted ? deleted[0] : null
    },

    updatePerfil(_, { filter, data }) {
        const i = indexPerfil(filter)

        if(i < 0) return null

        perfis[i].name = data.name
        return perfis[i]
    }

}