document.addEventListener("DOMContentLoaded", () => {
  const listaEstacoes = document.getElementById("listaEstacoesVisitadas");
  const listaTriangulos = document.getElementById("listaTriangulos");
  const btnFinalizar = document.getElementById("btnFinalizar");

  const turma = localStorage.getItem("turmaAtual");
  const grupo = localStorage.getItem("grupoAtual");
  const chaveVisitadas = `estacoesVisitadas_${turma}_${grupo}`;

  const visitadas = JSON.parse(localStorage.getItem(chaveVisitadas)) || [];

  // Mostrar estações visitadas
  if (visitadas.length === 0) {
    listaEstacoes.innerHTML = "<li>Nenhuma estação registrada.</li>";
  } else {
    visitadas.forEach(est => {
      const li = document.createElement("li");
      li.textContent = est;
      listaEstacoes.appendChild(li);
    });
  }

  // Sugerir dois triângulos
  if (visitadas.length >= 6) {
    const embaralhadas = [...visitadas].sort(() => Math.random() - 0.5);
    const triangulo1 = embaralhadas.slice(0, 3).join(", ");
    const triangulo2 = embaralhadas.slice(3, 6).join(", ");

    listaTriangulos.innerHTML = `
      <li><strong>Triângulo 1:</strong> ${triangulo1}</li>
      <li><strong>Triângulo 2:</strong> ${triangulo2}</li>
    `;
  } else {
    listaTriangulos.innerHTML = `
      <li><strong>Triângulo 1:</strong> Aguarde até visitar mais estações.</li>
      <li><strong>Triângulo 2:</strong> Aguarde até visitar mais estações.</li>
    `;
  }

  // Botão Finalizar
  btnFinalizar.addEventListener("click", () => {
    window.location.href = "conclusao.html"; // Altere o nome se sua tela final for diferente
  });
});
