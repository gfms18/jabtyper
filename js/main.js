//formula que calcula o tamanho da frase e imprime no console
var frase = $(".frase").text();
var numPalavras = frase.split(" ").length;
console.log(numPalavras);

var tempoJogo = $("#tempo");
var tempoInicial = tempoJogo.text();

//pega o tamanho da frase e apresenta na tela
var tamanhoFrase = $("#tamanho-frase");
tamanhoFrase.text(numPalavras);



var campo = $("#campo-digitacao");
campo.on("input", function () {
    //pega o conteudo do campo de texto
    var frase = campo.val();
    //conta quantos caracteres existem na frase digitada
    var nCaracteresDigitados = frase.length;
    //exibe a quantidade na tela
    $("#caracteres-digitados").text(nCaracteresDigitados);

    //quebra a frase em palavras e conta as palavras
    var nPalavrasDigitadas = frase.split(" ").length;
    //exibe a quantidade de palavras na tela
    $("#palavras-digitadas").text(nPalavrasDigitadas);
});


var cronometro;
var running = false;
campo.on("focus", function () {
    if (running == true) {
        return;
    }
    cronometro = setInterval(function () {
        var tempoRestante = tempoJogo.text();
        if (tempoRestante <= 0) {
            running = false
            campo.attr("disabled", true);
            console.log(tempoRestante);
            clearInterval(cronometro);
            nome = $("#nome").val()
            palavrasDigitadas = $("#palavras-digitadas").text()
            pontuacao = palavrasDigitadas / tempoInicial * 60
            $('#tabela-resultado').append('<tr><td>' + nome + '</td><td>' + pontuacao + '</td></tr>');
        } else {
            running = true
            tempoRestante--;
            tempoJogo.text(tempoRestante);
        }
    }, 1000);
});


$("#botao-reset").on("click", function () {
    if (cronometro)
        clearInterval(cronometro);
    running = false;
    campo.attr("disabled", false);
    campo.val("");
    $("#caracteres-digitados").text("0");
    $("#palavras-digitadas").text("0");
    $("#tempo").text(tempoInicial);
});