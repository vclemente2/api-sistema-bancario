const bancoDeDados = require('../bancodedados');
const utilsBancoDeDados = require('../utils/utils_banco_de_dados');

const intermediariosTransacoes = {
    verificaPreenchimentoValor: function (req, res, next) {
        const { valor } = req.body;

        try {
            if (!valor) {
                return res.status(400).json({ mensagem: "É necessário informar o valor." });
            }

            next();
        } catch (erro) {
            return res.status(500).json({ mensagem: erro.message });
        }
    },
    verificaPreenchimentoNumeroConta: function (req, res, next) {
        const { numero_conta } = req.body;

        try {
            if (!numero_conta) {
                return res.status(400).json({ mensagem: "É necessário informar o numero da conta." });
            }

            next();
        } catch (erro) {
            return res.status(500).json({ mensagem: erro.message });
        }
    },
    verificaSeValorEhValido: function (req, res, next) {
        const { valor } = req.body;

        try {
            if (!Number(valor) || Number(valor) <= 0) {
                return res.status(400).json({ mensagem: "Valor precisa ser um número maior do que zero." });
            }

            next();
        } catch (erro) {
            return res.status(500).json({ mensagem: erro.message });
        }
    },
    verificaSeContaEstaCadastrada: async function (req, res, next) {
        const { numero_conta } = req.body;

        try {
            const conta = await utilsBancoDeDados.encontraContaPeloNumero(numero_conta);

            if (!conta) {
                return res.status(404).json({ mensagem: "Conta não localizada." });
            }

            next();
        } catch (erro) {
            return res.status(500).json({ mensagem: erro.message });
        }
    },
    verificaPreenchimentoDaSenha: function (req, res, next) {
        const { senha } = req.body;

        try {
            if (!senha) {
                return res.status(401).json({ mensagem: "É necessário informar a senha." });
            }

            next();
        } catch (erro) {
            return res.status(500).json({ mensagem: erro.message });
        }
    },
    verificaSeSenhaEstaCorreta: async function (req, res, next) {
        const { senha, numero_conta, numero_conta_origem } = req.body;

        try {
            let numeroConta;
            numero_conta ? numeroConta = numero_conta : numeroConta = numero_conta_origem;

            const conta = await utilsBancoDeDados.encontraContaPeloNumero(numeroConta);

            if (conta.usuario.senha !== senha) {
                return res.status(401).json({ mensagem: "Senha incorreta." });
            }

            next();
        } catch (erro) {
            return res.status(500).json({ mensagem: erro.message });
        }
    },
    verificaDisponibilidadeDeSaldoParaTransacao: function (req, res, next) {
        const { numero_conta, numero_conta_origem, valor } = req.body;

        try {
            let numeroConta;
            numero_conta ? numeroConta = numero_conta : numeroConta = numero_conta_origem;

            const conta = bancoDeDados.contas.find((conta) => {
                return conta.numero == numeroConta;
            });

            if (conta.saldo < valor) {
                return res.status(400).json({ mensagem: "Saldo insuficiente." });
            }

            next();
        } catch (erro) {
            return res.status(500).json({ mensagem: erro.message });
        }
    },
    verificaContasTransferencia: async function (req, res, next) {
        const { numero_conta_origem, numero_conta_destino } = req.body;

        try {
            if (!numero_conta_origem) {
                return res.status(400).json({ mensagem: "É necessário informar a conta de origem." });
            }
            if (!numero_conta_destino) {
                return res.status(400).json({ mensagem: "É necessário informar a conta de destino." });
            }

            const contaOrigem = await utilsBancoDeDados.encontraContaPeloNumero(numero_conta_origem);
            const contaDestino = await utilsBancoDeDados.encontraContaPeloNumero(numero_conta_destino);

            if (!contaOrigem) {
                return res.status(404).json({ mensagem: "Conta de origem não localizada." });
            }
            if (!contaDestino) {
                return res.status(404).json({ mensagem: "Conta de destino não localizada." });
            }
            if (contaOrigem === contaDestino) {
                return res.status(400).json({ mensagem: "A conta de destino não pode ser a mesma de origem." });
            }

            next();
        } catch (erro) {
            return res.status(500).json({ mensagem: erro.message });
        }

    }
}
module.exports = intermediariosTransacoes;