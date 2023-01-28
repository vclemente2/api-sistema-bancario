const fs = require('fs/promises');

const geradorDeContas = {
    contadorConta: 0,
    leJsonContas: async function () {
        const stringConta = await fs.readFile('./src/utils/auxiliar_gerador_de_contas.json');
        const objConta = JSON.parse(stringConta);
        this.contadorConta = objConta.contadorConta;
    },
    escreveJsonContas: async function () {
        const contadorConta = this.contadorConta;
        const objConta = { contadorConta };
        const jsonContas = JSON.stringify(objConta);
        await fs.writeFile('./src/utils/auxiliar_gerador_de_contas.json', jsonContas);

    },
    geraConta: async function () {
        await this.leJsonContas();

        this.contadorConta++;

        await this.escreveJsonContas();

        return this.contadorConta;
    },
}

module.exports = geradorDeContas;