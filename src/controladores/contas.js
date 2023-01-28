const fs = require('fs/promises');

const bancoDeDados = require('../bancodedados');
const geradorDeContas = require('../utils/gerador_de_contas');
const utilsBancoDeDados = require('../utils/utils_banco_de_dados');

const controladoresConta = {
    listaContas: async function (req, res) {
        try {
            return res.status(200).json(bancoDeDados.contas);
        } catch (erro) {
            return res.status(500).json({ mensagem: erro.message });
        }
    },
    criaConta: async function (req, res) {
        const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

        try {
            const conta = {
                numero: (await geradorDeContas.geraConta()).toString(),
                saldo: 0,
                usuario: {
                    nome: nome.trim(),
                    cpf: cpf.trim(),
                    data_nascimento: data_nascimento.trim(),
                    telefone: telefone.trim(),
                    email: email.trim(),
                    senha: senha.trim()
                }
            }

            bancoDeDados.contas.push(conta);

            await utilsBancoDeDados.salvaAlteracoesNoBancoDeDados();

            return res.status(201).send();
        } catch (erro) {
            return res.status(500).json({ mensagem: erro.message });
        }
    },
    atualizaConta: async function (req, res) {
        const { numeroConta } = req.params;
        const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

        try {
            const contaQueSeraAtualizada = await utilsBancoDeDados.encontraContaPeloNumero(numeroConta);

            contaQueSeraAtualizada.usuario.nome = nome.trim();
            contaQueSeraAtualizada.usuario.cpf = cpf.trim();
            contaQueSeraAtualizada.usuario.data_nascimento = data_nascimento.trim();
            contaQueSeraAtualizada.usuario.telefone = telefone.trim();
            contaQueSeraAtualizada.usuario.email = email.trim();
            contaQueSeraAtualizada.usuario.senha = senha.trim();

            await utilsBancoDeDados.salvaAlteracoesNoBancoDeDados();

            return res.status(204).send();
        } catch (erro) {
            return res.status(500).json({ mensagem: erro.message });
        }
    },
    excluiConta: async function (req, res) {
        const { numeroConta } = req.params;

        try {
            const contaQueSeraExcluida = await utilsBancoDeDados.encontraContaPeloNumero(numeroConta);
            const indiceContaQueSeraExcluida = bancoDeDados.contas.indexOf(contaQueSeraExcluida);
            bancoDeDados.contas.splice(indiceContaQueSeraExcluida, 1);

            await utilsBancoDeDados.salvaAlteracoesNoBancoDeDados();

            return res.status(204).send();
        } catch (erro) {
            return res.status(500).json({ mensagem: erro.message });
        }
    },
    consultaSaldoDeUmaConta: async function (req, res) {
        const { numero_conta } = req.query;

        try {
            const conta = await utilsBancoDeDados.encontraContaPeloNumero(numero_conta);

            return res.status(200).json({ saldo: conta.saldo });
        } catch (erro) {
            return res.status(500).json({ mensagem: erro.message });
        }
    },
    consultaExtratoDeUmaConta: async function (req, res) {
        const { numero_conta } = req.query;

        try {
            const depositos = bancoDeDados.depositos.filter(deposito => { return deposito.numero_conta == numero_conta });
            const saques = bancoDeDados.saques.filter(saque => { return saque.numero_conta == numero_conta });
            const transferenciasEnviadas = bancoDeDados.transferencias.filter(transferencia => { return transferencia.numero_conta_origem == numero_conta });
            const transferenciasRecebidas = bancoDeDados.transferencias.filter(transferencia => { return transferencia.numero_conta_destino == numero_conta });

            const extratoConta = {
                depositos,
                saques,
                transferenciasEnviadas,
                transferenciasRecebidas
            }

            res.status(200).json(extratoConta);
        } catch (erro) {
            return res.status(500).json({ mensagem: erro.message });
        }
    }
}

module.exports = controladoresConta;