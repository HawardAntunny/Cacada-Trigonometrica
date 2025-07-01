document.addEventListener("DOMContentLoaded", () => {
  const alturaSpan = document.getElementById("altura");
  const distanciaSpan = document.getElementById("distancia");
  const resposta1 = document.getElementById("resposta1");
  const resposta2 = document.getElementById("resposta2");
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

  // POSTE BAIXO COM CORDAS PEQUENAS
  const opcoes = [
    { altura: 2, base: 2.5 },
    { altura: 2.2, base: 2.8 },
    { altura: 2.5, base: 3 },
    { altura: 2.8, base: 3.2 },
    { altura: 3, base: 3.5 }
  ];

  const sorteada = opcoes[Math.floor(Math.random() * opcoes.length)];
  const cateto1 = sorteada.altura;
  const cateto2 = sorteada.base;
  const hipotenusa1 = Math.sqrt(cateto1 ** 2 + cateto2 ** 2);
  const hipotenusa2 = Math.sqrt(cateto2 ** 2 + cateto1 ** 2); // mesma coisa, redundante mas didático

  alturaSpan.textContent = cateto1;
  distanciaSpan.textContent = cateto2;

  btnVerificar.addEventListener("click", () => {
    const r1 = parseFloat(resposta1.value.trim().replace(",", "."));
    const r2 = parseFloat(resposta2.value.trim().replace(",", "."));

    const respostas = [parseFloat(r1.toFixed(2)), parseFloat(r2.toFixed(2))];
    const esperadas = [parseFloat(hipotenusa1.toFixed(2)), parseFloat(hipotenusa2.toFixed(2))];

    const corretas = esperadas.every(e => respostas.includes(e));

    if (corretas) {
      feedback.textContent = "✔️ Respostas corretas!";
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
      feedback.textContent = "❌ Respostas incorretas. Tente novamente.";
      feedback.style.color = "red";
    }
  });
});
