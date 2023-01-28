const { Router } = require('express');

const controladoresConta = require('./controladores/contas');
const intermediariosConta = require('./intermediarios/contas');
const controladoresTransacoes = require('./controladores/transacoes');
const intermediariosTransacoes = require('./intermediarios/transacoes');

const rotas = Router();

rotas.get(
    '/contas',
    intermediariosConta.verificaAutenticacao,
    controladoresConta.listaContas
);
rotas.get(
    '/contas/saldo',
    intermediariosConta.verificaPreenchimentoQueryConta,
    intermediariosConta.verificaSeContaEstaCadastrada,
    intermediariosConta.verificaSeSenhaEstaCorreta,
    controladoresConta.consultaSaldoDeUmaConta
);
rotas.get(
    '/contas/extrato',
    intermediariosConta.verificaPreenchimentoQueryConta,
    intermediariosConta.verificaSeContaEstaCadastrada,
    intermediariosConta.verificaSeSenhaEstaCorreta,
    controladoresConta.consultaExtratoDeUmaConta
);
rotas.post(
    '/contas',
    intermediariosConta.verificaPreenchimentoPropriedadesUsuario,
    intermediariosConta.verificaSeCpfEstaCadastrado,
    intermediariosConta.verificaSeEmailEstaCadastrado,
    controladoresConta.criaConta
);
rotas.put(
    '/contas/:numeroConta/usuario',
    intermediariosConta.verificaPreenchimentoPropriedadesUsuario,
    intermediariosConta.verificaSeContaEstaCadastrada,
    intermediariosConta.verificaSeExisteOutraContaComMesmoEmailOuCpf,
    controladoresConta.atualizaConta
);
rotas.delete(
    '/contas/:numeroConta',
    intermediariosConta.verificaSeContaEstaCadastrada,
    intermediariosConta.verificaSeSaldoDaContaEstaZerado,
    controladoresConta.excluiConta
);

rotas.post(
    '/transacoes/depositar',
    intermediariosTransacoes.verificaPreenchimentoNumeroConta,
    intermediariosTransacoes.verificaPreenchimentoValor,
    intermediariosTransacoes.verificaSeValorEhValido,
    intermediariosTransacoes.verificaSeContaEstaCadastrada,
    controladoresTransacoes.depositaEmUmaConta
);
rotas.post(
    '/transacoes/sacar',
    intermediariosTransacoes.verificaPreenchimentoNumeroConta,
    intermediariosTransacoes.verificaPreenchimentoValor,
    intermediariosTransacoes.verificaPreenchimentoDaSenha,
    intermediariosTransacoes.verificaSeValorEhValido,
    intermediariosTransacoes.verificaSeContaEstaCadastrada,
    intermediariosTransacoes.verificaSeSenhaEstaCorreta,
    intermediariosTransacoes.verificaDisponibilidadeDeSaldoParaTransacao,
    controladoresTransacoes.sacaDeUmaConta
)
rotas.post(
    '/transacoes/transferir',
    intermediariosTransacoes.verificaContasTransferencia,
    intermediariosTransacoes.verificaPreenchimentoValor,
    intermediariosTransacoes.verificaSeValorEhValido,
    intermediariosTransacoes.verificaPreenchimentoDaSenha,
    intermediariosTransacoes.verificaSeSenhaEstaCorreta,
    intermediariosTransacoes.verificaDisponibilidadeDeSaldoParaTransacao,
    controladoresTransacoes.transfereParaUmaConta
);

module.exports = rotas;