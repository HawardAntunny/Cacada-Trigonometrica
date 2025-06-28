document.addEventListener("DOMContentLoaded", () => {
  const inputResposta = document.getElementById("resposta");
  const btnVerificar = document.getElementById("btnVerificar");
  const feedback = document.getElementById("feedback");
  const valorHipotenusaSpan = document.getElementById("valorHipotenusa");

  const turma = localStorage.getItem("turmaAtual");
  const grupo = localStorage.getItem("grupoAtual");
  const chaveEstacaoAtual = `estacaoAtual_${turma}_${grupo}`;
  const chaveVisitadas = `estacoesVisitadas_${turma}_${grupo}`;
  const nomeEstacao = "Estação 9";

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

  // Gera e mostra hipotenusa aleatória
  const valorHipotenusa = parseFloat((Math.random() * 2 + 5).toFixed(2));
  localStorage.setItem("hipotenusaEst9", valorHipotenusa);
  valorHipotenusaSpan.textContent = `${valorHipotenusa} metros`;

  const areaEsperada = parseFloat((valorHipotenusa ** 2 * 0.5041).toFixed(2));

  btnVerificar.addEventListener("click", () => {
    const respostaDigitada = parseFloat(inputResposta.value.replace(",", "."));

    if (isNaN(respostaDigitada)) {
      feedback.textContent = "⚠️ Informe a resposta corretamente.";
      feedback.style.color = "orange";
      return;
    }

    if (Math.abs(areaEsperada - respostaDigitada) <= 0.1) {
      feedback.textContent = "✔️ Resposta correta! Muito bem!";
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
      feedback.textContent = `❌ Resposta incorreta. Tente novamente.`;
      feedback.style.color = "red";
    }
  });
});
