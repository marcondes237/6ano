
const perguntas = [
    {
        categoria: "🔢 OPERAÇÕES",
        pergunta: "Quanto é 8 + 5?",
        alternativas: ["11", "12", "13", "14"],
        correta: 2,
        explicacao: "8 + 5 = 13. Muito bem!"
    },
    {
        categoria: "✖️ MULTIPLICAÇÃO",
        pergunta: "Quanto é 7 × 6?",
        alternativas: ["36", "42", "48", "56"],
        correta: 1,
        explicacao: "7 × 6 = 42."
    },
    {
        categoria: "➗ DIVISÃO",
        pergunta: "Quanto é 48 ÷ 6?",
        alternativas: ["6", "7", "8", "9"],
        correta: 2,
        explicacao: "48 ÷ 6 = 8."
    },
    {
        categoria: "➖ SUBTRAÇÃO",
        pergunta: "Quanto é 100 − 37?",
        alternativas: ["53", "63", "73", "67"],
        correta: 1,
        explicacao: "100 − 37 = 63."
    },
    {
        categoria: "🔢 FRAÇÕES",
        pergunta: "Qual fração representa a metade?",
        alternativas: ["1/3", "1/4", "2/3", "1/2"],
        correta: 3,
        explicacao: "1/2 representa uma de duas partes iguais."
    },
    {
        categoria: "🔺 GEOMETRIA",
        pergunta: "Quantos lados tem um hexágono?",
        alternativas: ["5", "6", "7", "8"],
        correta: 1,
        explicacao: "Um hexágono possui 6 lados."
    },
    {
        categoria: "🔢 NÚMEROS",
        pergunta: "Qual é o maior número?",
        alternativas: ["0,8", "0,65", "0,9", "0,75"],
        correta: 2,
        explicacao: "0,9 é o maior número dessa lista."
    },
    {
        categoria: "📏 MEDIDAS",
        pergunta: "Quantos centímetros há em 2 metros?",
        alternativas: ["20 cm", "200 cm", "2000 cm", "120 cm"],
        correta: 1,
        explicacao: "2 metros equivalem a 200 centímetros."
    },
    {
        categoria: "🧠 EXPRESSÕES",
        pergunta: "Quanto é 3 + 4 × 2?",
        alternativas: ["14", "11", "10", "12"],
        correta: 1,
        explicacao: "Primeiro 4 × 2 = 8. Depois 3 + 8 = 11."
    },
    {
        categoria: "🌎 DESAFIO FINAL",
        pergunta: "Um pacote tem 5 caixas com 4 lápis cada. Quantos lápis há?",
        alternativas: ["9", "15", "20", "25"],
        correta: 2,
        explicacao: "5 × 4 = 20 lápis."
    }
];

const telaInicial = document.getElementById("tela-inicial");
const telaJogo = document.getElementById("tela-jogo");
const telaFinal = document.getElementById("tela-final");

const botaoIniciar = document.getElementById("botao-iniciar");
const botaoProxima = document.getElementById("botao-proxima");
const botaoReiniciar = document.getElementById("botao-reiniciar");

const pontuacaoElemento = document.getElementById("pontuacao");
const vidasElemento = document.getElementById("vidas");
const numeroPergunta = document.getElementById("numero-pergunta");
const porcentagem = document.getElementById("porcentagem");
const barraProgresso = document.getElementById("barra-progresso");
const progresso = document.getElementById("progresso");
const categoria = document.getElementById("categoria");
const perguntaElemento = document.getElementById("pergunta");
const alternativasElemento = document.getElementById("alternativas");
const feedback = document.getElementById("feedback");

let indicePergunta = 0;
let pontuacao = 0;
let vidas = 3;
let acertos = 0;
let erros = 0;
let respondeu = false;

function iniciarJogo() {
    indicePergunta = 0;
    pontuacao = 0;
    vidas = 3;
    acertos = 0;
    erros = 0;
    respondeu = false;

    telaInicial.hidden = true;
    telaFinal.hidden = true;
    telaJogo.hidden = false;

    atualizarIndicadores();
    mostrarPergunta();
}

function atualizarIndicadores() {
    pontuacaoElemento.textContent = pontuacao;
    vidasElemento.textContent = "❤️".repeat(vidas) + "🖤".repeat(3 - vidas);

    const total = Math.round((indicePergunta / perguntas.length) * 100);

    numeroPergunta.textContent =
        `DESAFIO ${Math.min(indicePergunta + 1, perguntas.length)} DE ${perguntas.length}`;

    porcentagem.textContent = `${total}%`;
    progresso.style.width = `${total}%`;

    barraProgresso.setAttribute("aria-valuenow", indicePergunta);
}

function mostrarPergunta() {
    respondeu = false;

    const atual = perguntas[indicePergunta];

    categoria.textContent = atual.categoria;
    perguntaElemento.textContent = atual.pergunta;

    alternativasElemento.replaceChildren();
    feedback.hidden = true;
    feedback.textContent = "";
    feedback.className = "feedback";
    botaoProxima.hidden = true;

    atual.alternativas.forEach((alternativa, indice) => {
        const botao = document.createElement("button");

        botao.type = "button";
        botao.className = "alternativa";
        botao.textContent =
            `${String.fromCharCode(65 + indice)}) ${alternativa}`;

        botao.addEventListener("click", () => {
            verificarResposta(indice, botao);
        });

        alternativasElemento.appendChild(botao);
    });

    atualizarIndicadores();
    perguntaElemento.focus();
}

function verificarResposta(indiceEscolhido, botaoEscolhido) {
    if (respondeu) return;

    respondeu = true;

    const atual = perguntas[indicePergunta];
    const botoes = alternativasElemento.querySelectorAll("button");
    const acertou = indiceEscolhido === atual.correta;

    botoes.forEach((botao, indice) => {
        botao.disabled = true;

        if (indice === atual.correta) {
            botao.classList.add("correta");
        }
    });

    feedback.hidden = false;

    if (acertou) {
        pontuacao += 10;
        acertos++;

        feedback.classList.add("acerto");
        feedback.textContent = `✅ Correto! ${atual.explicacao}`;
    } else {
        vidas--;
        erros++;

        botaoEscolhido.classList.add("errada");
        feedback.classList.add("erro");
        feedback.textContent = `❌ Não foi dessa vez! ${atual.explicacao}`;
    }

    atualizarIndicadores();

    botaoProxima.hidden = false;

    if (vidas === 0 || indicePergunta === perguntas.length - 1) {
        botaoProxima.textContent = "Ver resultado 🏆";
    } else {
        botaoProxima.textContent = "Próximo desafio →";
    }
}

function proximaPergunta() {
    if (!respondeu) return;

    if (vidas === 0 || indicePergunta === perguntas.length - 1) {
        mostrarResultado();
        return;
    }

    indicePergunta++;
    mostrarPergunta();
}

function mostrarResultado() {
    telaJogo.hidden = true;
    telaFinal.hidden = false;

    const totalRespondidas = acertos + erros;
    const aproveitamento = totalRespondidas > 0
        ? Math.round((acertos / totalRespondidas) * 100)
        : 0;

    document.getElementById("pontuacao-final").textContent = pontuacao;
    document.getElementById("acertos-final").textContent = acertos;
    document.getElementById("erros-final").textContent = erros;
    document.getElementById("aproveitamento-final").textContent =
        `${aproveitamento}%`;

    const iconeFinal = document.getElementById("icone-final");
    const tituloFinal = document.getElementById("titulo-final");
    const mensagemFinal = document.getElementById("mensagem-final");

    if (aproveitamento >= 80) {
        iconeFinal.textContent = "🏆";
        tituloFinal.textContent = "Missão cumprida!";
        mensagemFinal.textContent =
            "Incrível! Você é um verdadeiro explorador dos números!";
    } else if (aproveitamento >= 50) {
        iconeFinal.textContent = "🌟";
        tituloFinal.textContent = "Muito bem, explorador!";
        mensagemFinal.textContent =
            "Você está no caminho certo. Continue praticando!";
    } else {
        iconeFinal.textContent = "🚀";
        tituloFinal.textContent = "Continue tentando!";
        mensagemFinal.textContent =
            "Toda missão ensina algo novo. Tente novamente e evolua!";
    }

    if (vidas === 0) {
        mensagemFinal.textContent +=
            " Suas vidas acabaram, mas você pode jogar novamente.";
    }

    progresso.style.width = "100%";
    porcentagem.textContent = "100%";
    barraProgresso.setAttribute("aria-valuenow", perguntas.length);
}

botaoIniciar.addEventListener("click", iniciarJogo);
botaoProxima.addEventListener("click", proximaPergunta);
botaoReiniciar.addEventListener("click", iniciarJogo);