document.addEventListener("DOMContentLoaded", () => {
  const abTexto = document.getElementById("abValor");
  const bcTexto = document.getElementById("bcValor");
  const inputResposta = document.getElementById("resposta");
  const btnVerificar = document.getElementById("btnVerificar");
  const feedback = document.getElementById("feedback");

  const turma = localStorage.getItem("turmaAtual");
  const grupo = localStorage.getItem("grupoAtual");
  const chaveEstacaoAtual = `estacaoAtual_${turma}_${grupo}`;
  const chaveVisitadas = `estacoesVisitadas_${turma}_${grupo}`;
  const nomeEstacao = "Estação 3";

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
    { ab: 12, bc: 5, resposta: "9,15" },
    { ab: 8,  bc: 3, resposta: "6,43" },
    { ab: 6,  bc: 4, resposta: "2,77" },
    { ab: 10, bc: 6, resposta: "5,48" },
    { ab: 7,  bc: 2, resposta: "6,18" }
  ];

  const sorteada = variacoes[Math.floor(Math.random() * variacoes.length)];
  const { ab, bc, resposta } = sorteada;

  abTexto.textContent = ab;
  bcTexto.textContent = bc;

  btnVerificar.addEventListener("click", () => {
    const entrada = inputResposta.value.trim().replace(".", ",");
    if (entrada === resposta) {
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
