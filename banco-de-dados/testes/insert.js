const db = require('../config/db')

// const newPerfil = {
//     name: 'visitante',
//     rotulo: 'Visitante'
// }

// db('perfis').insert(newPerfil)
//     .then(res => console.log(res.rowCount))
//     .catch(err => console.log(err.detail))
//     .finally(() => db.destroy())

const perfilSU = {
    name: 'root' + Math.random(),
    rotulo: 'Super Usuario'
}

db.insert(perfilSU).into('perfis')
    .then(res => console.log(res.rowCount))
    .catch(err => console.log(err.detail))
    .finally(() => db.destroy())