document.addEventListener("DOMContentLoaded", () => {
  const corda1Span = document.getElementById("corda1");
  const corda2Span = document.getElementById("corda2");
  const respostaInput = document.getElementById("resposta");
  const btnVerificar = document.getElementById("btnVerificar");
  const feedback = document.getElementById("feedback");

  const turma = localStorage.getItem("turmaAtual");
  const grupo = localStorage.getItem("grupoAtual");
  const chaveEstacaoAtual = `estacaoAtual_${turma}_${grupo}`;
  const chaveVisitadas = `estacoesVisitadas_${turma}_${grupo}`;
  const nomeEstacao = "Estação 7";

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

  const alturaPoste = 2.5;

  const opcoes = [
    { corda1: 3.2, corda2: 4 },
    { corda1: 3.0, corda2: 3.6 },
    { corda1: 2.9, corda2: 3.4 },
    { corda1: 3.1, corda2: 3.7 },
    { corda1: 3.3, corda2: 4.1 }
  ];

  const sorteada = opcoes[Math.floor(Math.random() * opcoes.length)];
  const h1 = sorteada.corda1;
  const h2 = sorteada.corda2;

  // Calcular as bases dos triângulos (AB e AC)
  const base1 = Math.sqrt(h1 ** 2 - alturaPoste ** 2);
  const base2 = Math.sqrt(h2 ** 2 - alturaPoste ** 2);

  // Calcular a distância entre B e C no chão
  const distanciaBC = Math.sqrt(base1 ** 2 + base2 ** 2);
  const distanciaEsperada = parseFloat(distanciaBC.toFixed(2));

  corda1Span.textContent = h1;
  corda2Span.textContent = h2;

  btnVerificar.addEventListener("click", () => {
    const resposta = parseFloat(respostaInput.value.trim().replace(",", "."));

    if (parseFloat(resposta.toFixed(2)) === distanciaEsperada) {
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
