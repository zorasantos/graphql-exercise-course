const db = require('../../config/db')
const { perfil: getPerfil } = require('../Query/perfil')

module.exports = {
    async newPerfil(_, { data }) {
        try {
            const [ id ] = await db('perfis')
                .insert(data)
            return db('perfis')
                .where({ id }).first()
        } catch(e) {
            throw new Error(e.sqlMessage)
        }
    },
    async deletePerfil(_, args) {
        try {
            const perfil = await getPerfil(_, args)
            if(perfil) {
                const { id } = perfil
                await db('users_perfis')
                    .where({ perfil_id: id }).delete()
                await db('perfis')
                    .where({ id }).delete()
            }
            return perfil
        } catch(e) {
            throw new Error(e.sqlMessage)
        }
    },
    async updatePerfil(_, { filter, data }) {
        try {
            const perfil = await getPerfil(_, { filter })
            if(perfil) {
                const { id } = perfil
                await db('perfis')
                    .where({ id })
                    .update(data)
            }
            return { ...perfil, ...data }
        } catch(e) {
            throw new Error(e.sqlMessage)
        }
    }
}