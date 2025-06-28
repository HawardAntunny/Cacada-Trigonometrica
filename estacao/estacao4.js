document.addEventListener("DOMContentLoaded", () => {
  const respostaInput = document.getElementById("resposta");
  const btnVerificar = document.getElementById("btnVerificar");
  const feedback = document.getElementById("feedback");
  const anguloTexto = document.getElementById("anguloTexto");

  const turma = localStorage.getItem("turmaAtual");
  const grupo = localStorage.getItem("grupoAtual");
  const chaveEstacaoAtual = `estacaoAtual_${turma}_${grupo}`;
  const chaveVisitadas = `estacoesVisitadas_${turma}_${grupo}`;
  const nomeEstacao = "Estação 4";

  const estacoes = [
    { nome: "Estação 1", arquivo: "estacao1.html" },
    { nome: "Estação 2", arquivo: "estacao2.html" },
    { nome: "Estação 3", arquivo: "estacao3.html" },
    { nome: "Estação 4", arquivo: "estacao4.html" },
    { nome: "Estação 5", arquivo: "estacao5.html" },
    { nome: "Estação 6", arquivo: "estacao6.html" },
    { nome: "Estação 7", arquivo: "estacao7.html" },
    { nome: "Estação 8", arquivo: "estacao8.html" },
    { nome: "Estação 9", arquivo: "estacao9.html" }
  ];

  const AC = 4; // distância do observador até o mastro

  const opcoes = [
    { angulo: 30, resposta: (AC * 0.58).toFixed(2) },
    { angulo: 45, resposta: (AC * 1).toFixed(2) },
    { angulo: 60, resposta: (AC * 1.73).toFixed(2) }
  ];

  const sorteada = opcoes[Math.floor(Math.random() * opcoes.length)];
  const respostaCorreta = sorteada.resposta;
  anguloTexto.textContent = sorteada.angulo;

  btnVerificar.addEventListener("click", () => {
    const respostaUsuario = respostaInput.value.trim().replace(",", ".");
    if (parseFloat(respostaUsuario).toFixed(2) === respostaCorreta) {
      feedback.textContent = "✔️ Resposta correta! Vamos para a próxima estação.";
      feedback.style.color = "green";

      let visitadas = JSON.parse(localStorage.getItem(chaveVisitadas)) || [];
      if (!visitadas.includes(nomeEstacao)) {
        visitadas.push(nomeEstacao);
        localStorage.setItem(chaveVisitadas, JSON.stringify(visitadas));
      }

      if (visitadas.length >= 6) {
        setTimeout(() => {
          window.location.href = "../final.html";
        }, 1200);
        return;
      }

      const restantes = estacoes.filter(e => !visitadas.includes(e.nome));
      const proxima = restantes[Math.floor(Math.random() * restantes.length)];
      localStorage.setItem(chaveEstacaoAtual, JSON.stringify(proxima));

      setTimeout(() => {
        window.location.href = `./${proxima.arquivo}`;
      }, 1200);
    } else {
      feedback.textContent = "❌ Resposta incorreta. Tente novamente.";
      feedback.style.color = "red";
    }
  });
});
