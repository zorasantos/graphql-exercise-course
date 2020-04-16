const db = require('../config/db')

// db('perfis')
//     .then(res => console.log(res))
//     .finally(() => db.destroy())


// db('perfis').select('name', 'id')
//     .then(res => console.log(res))
//     .finally(() => db.destroy())

// db.select('name', 'id')
//     .from('perfis')
//     .limit(4)
//     .then(res => console.log(res))
//     .finally(() => db.destroy())

db('perfis')
    // .where({ id: 2 }) Filtra por id
    // .where('id', '=', 2)
    // .where('name', 'like', '%m%') Filtra pela letra m, por determinado trecho
    // .whereNot({ id: 2 }) Não traz o id 2
    .whereIn('id', [1, 2, 3])
    // .first()
    .then(res => console.log(res))
    .finally(() => db.destroy())