document.addEventListener("DOMContentLoaded", () => {
  const alturaTexto = document.getElementById("alturaTexto");
  const inputResposta = document.getElementById("resposta");
  const btnVerificar = document.getElementById("btnVerificar");
  const feedback = document.getElementById("feedback");

  const turma = localStorage.getItem("turmaAtual");
  const grupo = localStorage.getItem("grupoAtual");
  const chaveEstacaoAtual = `estacaoAtual_${turma}_${grupo}`;
  const chaveVisitadas = `estacoesVisitadas_${turma}_${grupo}`;
  const nomeEstacao = "Estação 2";

 const alturasExatas = [
  { altura: 4, resultado: "5.00" },
  { altura: 3, resultado: "4.24" },
  { altura: 5, resultado: "5.83" },
];

  const sorteada = alturasExatas[Math.floor(Math.random() * alturasExatas.length)];
  alturaTexto.innerHTML = `A altura do muro até onde a placa encosta é de <strong>${sorteada.altura} metros</strong>.`;

  btnVerificar.addEventListener("click", () => {
    const resposta = inputResposta.value.trim().replace(",", ".");
    if (parseFloat(resposta).toFixed(1) === parseFloat(sorteada.resultado).toFixed(1)) {
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
