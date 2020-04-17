const jwt = require('jwt-simple')
const { perfis: getPerfis } = require('../Type/User')

module.exports = {
    async getUserLoggedIn(user) {
        const perfis = await getPerfis(user)
        const now = Math.floor(Date.now() / 1000)

        const userInfo = {
            id: user.id,
            name: user.name,
            email: user.email,
            perfis: perfis.map(p => p.name),
            iat: now,
            exp: now + (3 * 24 * 60 * 60)
        }

        const authSecret = process.env.APP_AUTH_SECRET
        return {
            ...userInfo,
            token: jwt.encode(userInfo, authSecret)
        }
    }
}