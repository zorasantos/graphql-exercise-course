const bcrypt = require('bcrypt-nodejs')
const db = require('../../config/db')
const { perfil: getPerfil } = require('../Query/perfil')
const { user: getUser } = require('../Query/user')

const mutations = {

    registerUser(_, { data }) {
        return mutations.newUser(_, {
            data: {
                name: data.name,
                email: data.email,
                password: data.password
            }
        })
    },
    async newUser(_, { data }) {
        try {
            const idsPerfis = []

            console.log(idsPerfis)

            if(!data.perfis || !data.perfis.length) {
                data.perfis = [{
                    name: 'commum'
                }]
            }

            for(let filter of data.perfis) {
                const perfil = await getPerfil(_, {
                    filter
                })
                if(perfil) idsPerfis.push(perfil.id)
            }

            const salt = bcrypt.genSaltSync()
            data.password = bcrypt.hashSync(data.password, salt)

            delete data.perfis
            const [ id ] = await db('users')
                .insert(data)

            for(let perfil_id of idsPerfis) {
                await db('users_perfis')
                    .insert({ perfil_id, user_id: id })
            }

            return db('users')
                .where({ id }).first()
        } catch(error) {
            throw new Error(error)
        }
    },
    async deleteUser(_, args) {
        try {
            const user = await getUser(_, args)
            if(user) {
                const { id } = user
                await db('users_perfis')
                    .where({ user_id: id }).delete()
                await db('users')
                    .where({ id }).delete()
            }
            return user
        } catch(err) {
            throw new Error(MediaStreamErrorEvent)
        }

    },
    async updateUser(_, { filter, data }) {
        try {
            const user = await getUser(_, { filter })
            if(user) {
                const { id } = user
                if(data.perfis) {
                    await db('users_perfis')
                        .where({ users_id: id }).delete()

                    for(let filter of data.perfis) {
                        const perfil = await getPerfil(_, {
                            filter
                        })

                        if(perfil) {
                            await db('users_perfis')
                                .insert({
                                    perfil_id: perfil.id,
                                    user_id: id
                                })
                        }
                    }
                }

                if(data.password) {
                    const salt = bcrypt.genSaltSync()
                    data.password = bcrypt.hashSync(data.password, salt)
                }

                delete data.perfis
                await db('users')
                    .where({ id })
                    .update(data)
            }
            return !user ? null : { ...user, ...data }
        } catch(err) {
            throw new Error(err)
        }
    }
}

module.exports = mutations