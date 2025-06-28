document.addEventListener("DOMContentLoaded", () => {
  const valorNSpan = document.getElementById("valorN");
  const inputResposta = document.getElementById("resposta");
  const btnVerificar = document.getElementById("btnVerificar");
  const feedback = document.getElementById("feedback");

  const turma = localStorage.getItem("turmaAtual");
  const grupo = localStorage.getItem("grupoAtual");
  const chaveEstacaoAtual = `estacaoAtual_${turma}_${grupo}`;
  const chaveVisitadas = `estacoesVisitadas_${turma}_${grupo}`;

  const nomeEstacao = "Estação 1";

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

  const variacoes = [
    { n: 4, resposta: "4" },
    { n: 5, resposta: "5" },
    { n: 6, resposta: "6" },
    { n: 7, resposta: "7" },
    { n: 8, resposta: "8" }
  ];

  const sorteada = variacoes[Math.floor(Math.random() * variacoes.length)];
  valorNSpan.textContent = sorteada.n;

  btnVerificar.addEventListener("click", () => {
    const valor = inputResposta.value.trim();
    if (valor === sorteada.resposta) {
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
      feedback.textContent = "❌ Resposta incorreta. Tente novamente!";
      feedback.style.color = "red";
    }
  });
});
