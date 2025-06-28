document.addEventListener("DOMContentLoaded", () => {
  const respostaInput = document.getElementById("resposta");
  const btnVerificar = document.getElementById("btnVerificar");
  const feedback = document.getElementById("feedback");
  const anguloTexto = document.getElementById("anguloTexto");
  const baseTexto = document.getElementById("baseTexto");

  const turma = localStorage.getItem("turmaAtual");
  const grupo = localStorage.getItem("grupoAtual");
  const chaveEstacaoAtual = `estacaoAtual_${turma}_${grupo}`;
  const chaveVisitadas = `estacoesVisitadas_${turma}_${grupo}`;
  const nomeEstacao = "Estação 8";

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

  const distancia = 5;
  baseTexto.textContent = distancia;

  const variacoes = [
    { angulo: 30, tangente: 0.5773502692 },
    { angulo: 45, tangente: 1 },
    { angulo: 60, tangente: 1.732050808 }
  ];

  const sorteada = variacoes[Math.floor(Math.random() * variacoes.length)];
  const altura = (distancia * sorteada.tangente).toFixed(2);
  anguloTexto.textContent = sorteada.angulo;

  btnVerificar.addEventListener("click", () => {
    const resposta = parseFloat(respostaInput.value.replace(",", ".")).toFixed(2);
    if (resposta === altura) {
      feedback.textContent = "✔️ Resposta correta!";
      feedback.style.color = "green";

      let visitadas = JSON.parse(localStorage.getItem(chaveVisitadas)) || [];
      if (!visitadas.includes(nomeEstacao)) {
        visitadas.push(nomeEstacao);
        localStorage.setItem(chaveVisitadas, JSON.stringify(visitadas));
      }

      if (visitadas.length >= 6) {
        setTimeout(() => {
          window.location.href = "../final.html";
        }, 1500);
        return;
      }

      const restantes = estacoes.filter(e => !visitadas.includes(e.nome));
      const proxima = restantes[Math.floor(Math.random() * restantes.length)];
      localStorage.setItem(chaveEstacaoAtual, JSON.stringify(proxima));

      setTimeout(() => {
        window.location.href = `./${proxima.arquivo}`;
      }, 1500);
    } else {
      feedback.textContent = "❌ Resposta incorreta. Tente novamente.";
      feedback.style.color = "red";
    }
  });
});
