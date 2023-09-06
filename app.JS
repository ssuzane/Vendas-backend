 /*******************************************************************
  * Autor:Suzane Arcanjo da Hora.
  *******************************************************************/
 
 
 
 const readline = require('readline');

var calcularValorAtualizado = require('./modulo/valoresAtualizados.js');

const entradaDados = readline.createInterface({

   input:process.stdin,
   output: process.stdout

});


function solicitarValorVenda() {
    return new Promise((resolve, reject) => {
        entradaDados.question("Qual é o valor da venda: ", (valorVenda) => {
            const valorNum = parseFloat(valorVenda);
            if (isNaN(valorNum) || valorNum <= 0) {
                console.log("Valor inválido. Por favor, digite um valor numérico positivo.");
                resolve(solicitarValorVenda());
            } else {
                resolve(valorNum);
            }
        });
    });
}




function exibirResultado(valorVenda, valorAtualizado) {
    console.log(`Valor da venda: R$ ${valorVenda.toFixed(2)}\nValor atualizado: R$ ${valorAtualizado.toFixed(2)}`);
    entradaDados.close();
}


async function processoDeVendas() {
    const valorVenda = await solicitarValorVenda();
    const codigo = parseInt(await new Promise(resolve => {
        entradaDados.question("Digite a classificação:\n1 - À vista, com 8% de desconto\n2 - À vista no cartão, 4% de desconto\n3 - Em 2x preço normal sem juros\n4 - Em 4x preço acrescido de 8\n", resolve);
    }));
    
    const valorAtualizado = calcularValorAtualizado.calcularValorAtualizado(valorVenda, codigo);
    if (valorAtualizado !== null) {
        exibirResultado(valorVenda, valorAtualizado);
    }
}

processoDeVendas();
