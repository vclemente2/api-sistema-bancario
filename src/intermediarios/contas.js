const bancoDeDados = require('../bancodedados');
const utilsBancoDeDados = require('../utils/utils_banco_de_dados');

const intermediariosConta = {
    verificaAutenticacao: function (req, res, next) {
        const { senha_banco } = req.query;

        try {
            if (!senha_banco) {
                return res.status(401).json({ mensagem: "É necessário informar a senha." });
            }
            if (senha_banco !== bancoDeDados.banco.senha) {
                return res.status(401).json({ mensagem: "A senha do banco informada é inválida!" });
            }

            next();
        } catch (erro) {
            return res.status(500).json({ mensagem: erro.message });
        }
    },
    verificaPreenchimentoPropriedadesUsuario: function (req, res, next) {
        const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

        try {
            if (!nome || !nome.trim()) {
                return res.status(400).json({ mensagem: "É necessário informar o nome." });
            }
            if (!cpf || !cpf.trim()) {
                return res.status(400).json({ mensagem: "É necessário informar o cpf." });
            }
            if (!data_nascimento || !data_nascimento.trim()) {
                return res.status(400).json({ mensagem: "É necessário informar a data de nascimento." });
            }
            if (!telefone || !telefone.trim()) {
                return res.status(400).json({ mensagem: "É necessário informar o número de telefone." });
            }
            if (!email || !email.trim()) {
                return res.status(400).json({ mensagem: "É necessário informar o e-mail." });
            }
            if (!senha || !senha.trim()) {
                return res.status(400).json({ mensagem: "É necessário informar uma senha." });
            }

            next();
        } catch (erro) {
            return res.status(500).json({ mensagem: erro.message });
        }
    },
    verificaSeCpfEstaCadastrado: function (req, res, next) {
        const { cpf } = req.body;

        try {
            const cpfCadastrado = bancoDeDados.contas.find((conta) => {
                return conta.usuario.cpf == cpf;
            });

            if (cpfCadastrado) {
                return res.status(400).json({ mensagem: "Já existe uma conta cadastrada para o CPF informado." });
            }

            next();
        } catch (erro) {
            return res.status(500).json({ mensagem: erro.message })
        }
    },
    verificaSeEmailEstaCadastrado: function (req, res, next) {
        const { email } = req.body;

        try {
            const conta = bancoDeDados.contas.find((conta) => {
                return conta.usuario.email == email;
            });

            if (conta) {
                return res.status(400).json({ mensagem: "Já existe uma conta cadastrada para o e-mail informado." });
            }

            next();
        } catch (erro) {
            return res.status(500).json({ mensagem: erro.message });
        }
    },
    verificaSeContaEstaCadastrada: async function (req, res, next) {
        let numeroConta = req.params.numeroConta;
        if (!numeroConta) {
            numeroConta = req.query.numero_conta;

        }
        try {
            const conta = await utilsBancoDeDados.encontraContaPeloNumero(numeroConta);

            if (!conta) {
                return res.status(404).json({ mensagem: "Conta não localizada." });
            }

            next();
        } catch (erro) {
            return res.status(500).json({ mensagem: erro.message });
        }
    },
    verificaSeExisteOutraContaComMesmoEmailOuCpf: function (req, res, next) {
        const { numeroConta } = req.params;
        const { cpf, email } = req.body;

        try {
            const outrasContas = bancoDeDados.contas.filter((conta) => {
                return conta.numero != numeroConta;
            });

            const existeOutraContaComOCpfInformado = outrasContas.find((conta) => {
                return conta.usuario.cpf == cpf;
            });
            const existeOutraContaComOEmailInformado = outrasContas.find((conta) => {
                return conta.usuario.email == email;
            });

            if (existeOutraContaComOCpfInformado || existeOutraContaComOEmailInformado) {
                return res.status(400).json({ mensagem: 'Já existe uma conta com o cpf ou e-mail informado!' });
            }

            next();
        } catch (erro) {
            return res.status(500).json({ mensagem: erro.message });
        }
    },
    verificaSeSaldoDaContaEstaZerado: async function (req, res, next) {
        const { numeroConta } = req.params;

        try {
            const conta = await utilsBancoDeDados.encontraContaPeloNumero(numeroConta);

            if (conta.saldo !== 0) {
                return res.status(400).json({ mensagem: "A conta só pode ser removida se o saldo for zero!" });
            }

            next();
        } catch (erro) {
            return res.status(500).json({ mensagem: erro.message });
        }

    },
    verificaPreenchimentoQueryConta: function (req, res, next) {
        const { numero_conta, senha } = req.query;

        try {
            if (!numero_conta || !senha) {
                return res.status(400).json({ mensagem: "É necessário informar o número da conta e a senha." });
            }

            next();
        } catch (erro) {
            return res.status(500).json({ mensagem: erro.message });
        }
    },
    verificaSeSenhaEstaCorreta: async function (req, res, next) {
        const { numero_conta, senha } = req.query;

        try {
            const conta = await utilsBancoDeDados.encontraContaPeloNumero(numero_conta);

            if (conta.usuario.senha !== senha) {
                return res.status(401).json({ mensagem: "Senha incorreta." });
            }

            next();
        } catch (erro) {
            return res.status(500).json({ mensagem: erro.message });
        }
    }
}

module.exports = intermediariosConta;