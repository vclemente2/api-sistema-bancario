module.exports = {
    "banco": {
        "nome": "Cubos Bank",
        "numero": "123",
        "agencia": "0001",
        "senha": "Cubos123Bank"
    },
    "contas": [
        {
            "numero": "1",
            "saldo": 2000,
            "usuario": {
                "nome": "Foo Bar 2",
                "cpf": "0001001122234",
                "data_nascimento": "2021-03-15",
                "telefone": "71999998888",
                "email": "fo0o0@bar2.com",
                "senha": "12345"
            }
        },
        {
            "numero": "2",
            "saldo": 24830,
            "usuario": {
                "nome": "Gabriela Silva",
                "cpf": "12345678910",
                "data_nascimento": "1995-03-19",
                "telefone": "71999998888",
                "email": "gabriela@bar.com",
                "senha": "010203"
            }
        },
        {
            "numero": "3",
            "saldo": 0,
            "usuario": {
                "nome": "Vinicius Bastos",
                "cpf": "1414114114",
                "data_nascimento": "1992-08-09",
                "telefone": "21999990000",
                "email": "vinicius@bar.com",
                "senha": "333333"
            }
        },
        {
            "numero": "4",
            "saldo": 2000,
            "usuario": {
                "nome": "João",
                "cpf": "12332112332",
                "data_nascimento": "1990-04-20",
                "telefone": "21777776666",
                "email": "joao@email.com",
                "senha": "445566"
            }
        },
        {
            "numero": "5",
            "saldo": 189000,
            "usuario": {
                "nome": "Lucia",
                "cpf": "15115115115",
                "data_nascimento": "1965-04-20",
                "telefone": "2112344321",
                "email": "lucia@email.com",
                "senha": "554433"
            }
        },
        {
            "numero": "6",
            "saldo": 5000,
            "usuario": {
                "nome": "Valdeci Bastos",
                "cpf": "555555555",
                "data_nascimento": "1965-04-20",
                "telefone": "2112344321",
                "email": "valdeci@email.com",
                "senha": "554433"
            }
        },
        {
            "numero": "9",
            "saldo": 2500,
            "usuario": {
                "nome": "Valter",
                "cpf": "25717714145",
                "data_nascimento": "1965-04-20",
                "telefone": "2112344321",
                "email": "valter@email.com",
                "senha": "050307"
            }
        }
    ],
    "saques": [
        {
            "data": "2022-12-26 16:09:29",
            "numero_conta": "6",
            "valor": 10000
        },
        {
            "data": "2022-12-26 16:12:21",
            "numero_conta": "5",
            "valor": 10000
        },
        {
            "data": "2022-12-26 19:12:00",
            "numero_conta": "5",
            "valor": 40000
        },
        {
            "data": "2022-12-26 23:15:50",
            "numero_conta": "5",
            "valor": 10000
        },
        {
            "data": "2022-12-27 00:01:19",
            "numero_conta": "5",
            "valor": 2000
        },
        {
            "data": "2022-12-28 20:20:20",
            "numero_conta": "6",
            "valor": 3000
        }
    ],
    "depositos": [
        {
            "data": "2022-12-26 13:05:34",
            "numero_conta": "5",
            "valor": 250000
        },
        {
            "data": "2022-12-26 15:06:01",
            "numero_conta": "6",
            "valor": 10000
        },
        {
            "data": "2022-12-26 16:11:21",
            "numero_conta": "6",
            "valor": 10000
        },
        {
            "data": "2022-12-27 15:42:08",
            "numero_conta": "1",
            "valor": 25830
        },
        {
            "data": "2022-12-28 20:26:40",
            "numero_conta": "9",
            "valor": 4500
        }
    ],
    "transferencias": [
        {
            "data": "2022-12-27 16:40:23",
            "numero_conta_origem": "1",
            "numero_conta_destino": "2",
            "valor": 25830
        },
        {
            "data": "2022-12-27 22:47:59",
            "numero_conta_origem": "2",
            "numero_conta_destino": "4",
            "valor": 1000
        },
        {
            "data": "2022-12-28 00:44:41",
            "numero_conta_origem": "5",
            "numero_conta_destino": "4",
            "valor": 1000
        },
        {
            "data": "2022-12-28 00:45:18",
            "numero_conta_origem": "6",
            "numero_conta_destino": "5",
            "valor": 2000
        },
        {
            "data": "2022-12-28 20:27:15",
            "numero_conta_origem": "9",
            "numero_conta_destino": "1",
            "valor": 2000
        }
    ]
}