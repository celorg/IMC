let arrDados;//undefined

//Verifica se já tem dados guardados no local storage
if( localStorage.getItem('listaIMC') != null  ){
    //pega os dados so local storage e converte e variável JS
    arrDados =  JSON.parse(localStorage.getItem('listaIMC')) ;
} else {
    arrDados = [];//array global vazio
}

exibeCadastro();

function calcular() {
    //pegar os dados do formulário
    let nome = document.getElementById("nome").value;
    let altura = parseFloat(document.getElementById("altura").value);
    let peso = parseFloat(document.getElementById("peso").value);

    //validar se os dados estão preenchidos
    if (nome == "" || isNaN(altura) || isNaN(peso)) {
        alert("Preencha todos os campos");
        return false;//para a execução da função
    }

    let imc = calculaIMC(altura, peso);

    //gerar o texto da situação
    let situacao = geraSituacao(imc);

    //gerar o objeto com todos os dados do cadastro
    let pessoa = {
        nome: nome,
        altura: altura,
        peso: peso,
        imc: imc,
        situacao: situacao
    };

    //cadastra a pessoa no array de dados
    arrDados.push(pessoa);

    //salvar no localStorage como string JSON
    localStorage.setItem('listaIMC', JSON.stringify(arrDados) );

    //chamar a função pra exibir os cadastros
    exibeCadastro();


}//fim da função calcular

/*********** REFATORAÇÃO DO IMC***********/

function calculaIMC(altura, peso) {
    return peso / (altura ^ 2);
}

/*
    Resultado	        Situação
    Menor que 18.5      Magreza Severa
    Entre 18.5 e 24.99	Peso normal
    Entre 25 e 29.99	Acima do peso
    Entre 30 e 34.99	Obesidade I
    Entre 35 e 39.99	Obesidade II (severa)
    Acima de 40	        Cuidado!!! else
*/
function geraSituacao(imc) {

    if (imc < 18.5) {
        return "Magreza Severa";
    } else if (imc >= 18.5 && imc <= 24.99) {
        return "Peso normal";
    } else if (imc >= 25 && imc <= 29.99) {
        return "Acima do peso";
    } else if (imc >= 30 && imc <= 34.99) {
        return "Obesidade I";
    } else if (imc >= 35 && imc <= 39.99) {
        return "Obesidade II";
    } else {
        return "Cuidado!";
    }
}


//Criar a função exibeCadastro() que mostre os dados na tela
function exibeCadastro() {
    //deve ler um array de cadastros
    let linhaTabela = '';
    for (let i = 0; i < arrDados.length; i++) {
        linhaTabela += `<tr>
                <td>${arrDados[i].nome}</td>
                <td>${arrDados[i].altura}</td>
                <td>${arrDados[i].peso}</td>
                <td>${arrDados[i].imc.toFixed(2)}</td>
                <td>${arrDados[i].situacao}</td>
            </tr>`;
    }

    //exibir todos os registros no HTML
    document.getElementById("cadastro").innerHTML = linhaTabela;
}