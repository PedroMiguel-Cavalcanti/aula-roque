//gpt usado para corrigir erros gramaticais :) e pra deixar mais aceitavel para o olho humano
const contas = []; 

function inserirConta() {
    const agencia = document.getElementById("agencia").value;
    const numero = document.getElementById("numero").value;
    const tipo = document.getElementById("tipo").value;
    const saldo = parseFloat(document.getElementById("saldo").value);

    let novaConta;

    if (tipo === "corrente") {
        const cartaoCredito = parseFloat(prompt("Informe o limite do cartão de crédito:"));
        novaConta = new ContaCorrente(agencia, numero, saldo, cartaoCredito);
    } else if (tipo === "poupanca") {
        novaConta = new ContaPoupanca(agencia, numero, saldo);
    } else if (tipo === "universitaria") {
        novaConta = new ContaUniversitaria(agencia, numero, saldo);
    }

    contas.push(novaConta);
    alert("Conta criada com sucesso!");
}

function deletarConta() {
    const index = prompt("Informe o índice da conta que deseja deletar:");
    if (index >= 0 && index < contas.length) {
        contas.splice(index, 1);
        alert("Conta deletada com sucesso!");
    } else {
        alert("Índice inválido!");
    }
}

function visualizarContas() {
    const contasList = document.getElementById("contasList");
    contasList.innerHTML = "";

    for (let i = 0; i < contas.length; i++) {
        const conta = contas[i];
        const listItem = document.createElement("li");
        listItem.innerHTML = `Agência: ${conta.agencia}, Número: ${conta.numero}, Tipo: ${conta.tipo}, Saldo: ${conta.getSaldo()}`;
        contasList.appendChild(listItem);
    }
}

class ContaBancaria {
    constructor(agencia, numero, tipo, saldo) {
        this.agencia = agencia;
        this.numero = numero;
        this.tipo = tipo;
        this.saldo = saldo;
    }

    
    getSaldo() {
        return this.saldo;
    }

    setSaldo(saldo) {
        this.saldo = saldo;
    }

    
    sacar(valor) {
        if (valor <= this.saldo) {
            this.saldo -= valor;
            return true;
        }
        return false;
    }

    
    depositar(valor) {
        this.saldo += valor;
    }
}


class ContaCorrente extends ContaBancaria {
    constructor(agencia, numero, saldo, cartaoCredito) {
        super(agencia, numero, "Conta Corrente", saldo);
        this.cartaoCredito = cartaoCredito;
    }

    
    getCartaoCredito() {
        return this.cartaoCredito;
    }

    setCartaoCredito(cartaoCredito) {
        this.cartaoCredito = cartaoCredito;
    }
}


class ContaPoupanca extends ContaBancaria {
    constructor(agencia, numero, saldo) {
        super(agencia, numero, "Conta Poupança", saldo);
    }
}


class ContaUniversitaria extends ContaBancaria {
    constructor(agencia, numero, saldo) {
        super(agencia, numero, "Conta Universitária", saldo);
    }

    
    sacar(valor) {
        if (valor <= 500 && valor <= this.saldo) {
            this.saldo -= valor;
            return true;
        }
        return false;
    }
}
