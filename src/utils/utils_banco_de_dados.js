const fs = require('fs/promises');
const fns = require('date-fns');

const bancoDeDados = require('../bancodedados');

const utilsBancoDeDados = {
    salvaAlteracoesNoBancoDeDados: async function () {
        const bancoDedadosJson = JSON.stringify(bancoDeDados, null, 4);
        await fs.writeFile('./src/bancodedados.js', 'module.exports = ' + bancoDedadosJson);
    },
    encontraContaPeloNumero: function (numeroConta) {
        const conta = bancoDeDados.contas.find((conta) => {
            return conta.numero == numeroConta;
        });

        return conta;
    },
    geraRegistroDeTransacao: async function (numero_conta, valor, numero_conta_destino) {
        let registro;

        if (numero_conta_destino) {
            registro = {
                data: fns.format(new Date(), "yyyy-MM-dd HH:mm:ss"),
                numero_conta_origem: numero_conta,
                numero_conta_destino: numero_conta_destino,
                valor: Number(valor)
            }
        } else {
            registro = {
                data: fns.format(new Date(), "yyyy-MM-dd HH:mm:ss"),
                numero_conta,
                valor: Number(valor)
            }
        }
        return registro;
    }
}

module.exports = utilsBancoDeDados;