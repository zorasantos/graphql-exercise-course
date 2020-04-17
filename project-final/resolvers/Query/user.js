const db = require('../../config/db')
const bcrypt = require('bcrypt-nodejs')
const { getUserLoggedIn } = require('../comum/user')

module.exports = {
    async login(_, { data }) {
        const user = await db('users')
            .where({ email: data.email })
            .first()

            if(!user) {
                throw new Error('Usuario/senha invalido!')
            }

            const isMatch = bcrypt.compareSync(data.password, user.password)

            if(!isMatch) {
                throw new Error('Usuario/senha invalido!')
            }

            return getUserLoggedIn(user)

    },
    users() {
        return db('users')
    },
    user(_, { filter }) {
        if(!filter) return null
        const { id, email } = filter
        if(id) {
            return db('users')
                .where({ id })
                .first()
        } else if(email) {
            return db('users')
                .where({ email })
                .first()
        } else {
            return null
        }
    },
}