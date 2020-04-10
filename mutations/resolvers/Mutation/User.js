const { users, nextId } = require('../../data/db')

function indexUser(filter) {
    if(!filter) return -1
    const { id, email } = filter
    if(id) {
        return users
            .findIndex(u => u.id === id)
    } else if(email) {
        return users
            .findIndex(u => u.email === email)
    }
    return -1
}

module.exports = {
    // { name, email, age }
    newUser(_, { data }) {
        const emailExist = users
            .some(u => u.email === data.email)
        if(emailExist) {
            throw new Error('E-mail ja cadastrado!')
        }
        const novo = {
            id: nextId(),
            ...data,
            perfil_id: 1,
            status: 'ATIVO'
        }

        users.push(novo)
        return novo
    },

    deleteUser(_, { filter }) {
        const i = indexUser(filter)
        if(i < 0) return null
        const deleted = users.splice(i, 1)
        return deleted ? deleted[0] : null
    },

    updateUser(_, { filter, data }) {
        const i = indexUser(filter)

        if(i < 0) return null

        users[i].name = data.name
        users[i].email = data.email
        if(data.age) {
            users[i].age = data.age
        }
        return users[i]
    }

}