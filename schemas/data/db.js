const usuarios = [{
    id: 1,
    name: 'Zora santos',
    idade: 34,
    perfil_id: 1,
    status: 'ATIVO'
},
{
    id: 2,
    name: 'Cris Oliveira',
    idade: 34,
    perfil_id: 1,
    status: 'INATIVO'
},
{
    id: 3,
    name: 'Caio Ian',
    idade: 13,
    perfil_id: 2,
    status: 'BLOQUEADO'
}]

const perfis = [
    { id: 1, name: 'comum' },
    { id: 2, name: 'admin' }
]

module.exports = { usuarios, perfis }