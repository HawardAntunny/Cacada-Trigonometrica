document.addEventListener("DOMContentLoaded", () => {
  const respostaInput = document.getElementById("resposta");
  const btnVerificar = document.getElementById("btnVerificar");
  const feedback = document.getElementById("feedback");
  const anguloTexto = document.getElementById("anguloTexto"); // compatibilidade

  const bcSpan = document.getElementById("bc");
  const deSpan = document.getElementById("de");
  const efSpan = document.getElementById("ef");

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

  const opcoes = [
    { bc: 1.2, de: 1.5, ef: 2.0 },
    { bc: 1.0, de: 1.0, ef: 1.5 },
    { bc: 1.3, de: 1.4, ef: 1.2 },
    { bc: 1.1, de: 1.6, ef: 1.3 },
    { bc: 1.5, de: 1.2, ef: 1.8 }
  ];

  const sorteada = opcoes[Math.floor(Math.random() * opcoes.length)];
  const bc = sorteada.bc;
  const de = sorteada.de;
  const ef = sorteada.ef;

  bcSpan.textContent = bc;
  deSpan.textContent = de;
  efSpan.textContent = ef;

  const af = Math.sqrt(Math.pow(bc + de, 2) + Math.pow(ef, 2));
  const respostaCorreta = parseFloat(af.toFixed(2));

  btnVerificar.addEventListener("click", () => {
    const respostaUsuario = respostaInput.value.trim().replace(",", ".");

    if (parseFloat(respostaUsuario).toFixed(2) === respostaCorreta.toFixed(2)) {
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
