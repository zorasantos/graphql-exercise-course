const { usuarios, perfis } = require('../data/db')

module.exports = {
    ola() {
        return "Resolvido"
    },
    createdAt() {
        return "Data e hora"
    },
    horaAtual() {
        return new Date
    },
    usuarioLogado() {
        return {
            id: 1,
            name: 'Zora Santos',
            email: 'zora@gmail.com',
            idade: 34,
            salario: 2.600,
            vip: true
        }
    },
    produtoEmDestaque() {
        return {
            name: 'Barra de chocolate',
            preco: 2.00,
            desconto: 0.15
        }
    },
    numeroMegaSena() {
        //return [2, 4, 6, 9, 0]
        const crescente = (a, b) => a - b
        return Array(6).fill(0)
            .map(n => parseInt(Math.random() * 60 + 1))
            .sort(crescente)
    },
    usuarios() {
        return usuarios
    },
    usuario(_, args) {
        const selecionados = usuarios
            .filter(u => u.id == args.id)
        return selecionados ? selecionados[0] : null
    },
    perfis() {
        return perfis
    },
    perfil(_, { id }) {
        const selecionados = perfis
            .filter(p => p.id === id)
        return selecionados ? selecionados[0] : null
    }
}