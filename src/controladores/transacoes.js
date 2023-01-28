const bancoDeDados = require('../bancodedados');
const utilsBancoDeDados = require('../utils/utils_banco_de_dados');

const controladoresTransacoes = {
    depositaEmUmaConta: async function (req, res) {
        const { numero_conta, valor } = req.body;

        try {
            const contaDestinoDeposito = await utilsBancoDeDados.encontraContaPeloNumero(numero_conta);
            contaDestinoDeposito.saldo += Number(valor);

            const registroDeposito = await utilsBancoDeDados.geraRegistroDeTransacao(numero_conta, valor);

            bancoDeDados.depositos.push(registroDeposito);

            await utilsBancoDeDados.salvaAlteracoesNoBancoDeDados();

            return res.status(201).send();
        } catch (erro) {
            return res.status(500).json({ mensagem: erro.message });
        }
    },
    sacaDeUmaConta: async function (req, res) {
        const { numero_conta, valor } = req.body;

        try {
            const contaOrigemSaque = await utilsBancoDeDados.encontraContaPeloNumero(numero_conta);

            contaOrigemSaque.saldo -= valor;

            const registroSaque = await utilsBancoDeDados.geraRegistroDeTransacao(numero_conta, valor);

            bancoDeDados.saques.push(registroSaque);

            await utilsBancoDeDados.salvaAlteracoesNoBancoDeDados();

            return res.status(201).send();
        } catch (erro) {
            return res.status(500).json({ mensagem: erro.message });
        }
    },
    transfereParaUmaConta: async function (req, res) {
        const { numero_conta_origem, numero_conta_destino, valor } = req.body;

        try {
            const contaOrigem = await utilsBancoDeDados.encontraContaPeloNumero(numero_conta_origem);
            const contaDestino = await utilsBancoDeDados.encontraContaPeloNumero(numero_conta_destino);

            contaOrigem.saldo -= valor;
            contaDestino.saldo += valor;

            const registroTransferencia = await utilsBancoDeDados.geraRegistroDeTransacao(numero_conta_origem, valor, numero_conta_destino);

            bancoDeDados.transferencias.push(registroTransferencia);

            await utilsBancoDeDados.salvaAlteracoesNoBancoDeDados();

            return res.status(201).send();
        } catch (erro) {
            return res.status(500).json({ mensagem: erro.message });
        }
    }
}

module.exports = controladoresTransacoes;