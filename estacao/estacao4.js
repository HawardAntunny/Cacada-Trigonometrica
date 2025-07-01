document.addEventListener("DOMContentLoaded", () => {
  const respostaInput = document.getElementById("resposta");
  const btnVerificar = document.getElementById("btnVerificar");
  const feedback = document.getElementById("feedback");
  const anguloTexto = document.getElementById("anguloTexto"); // não usado, mas necessário para compatibilidade

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

  // Cálculo: caminho mais curto = √(14² + 10² + 7²) = √(196 + 100 + 49) = √345 ≈ 18.57
  const respostaCorreta = (Math.sqrt(14 * 14 + 10 * 10 + 7 * 7)).toFixed(2); // 18.57

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
