document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("grupoForm");

  // === PÁGINA INICIAL ===
  if (form) {
    const iniciarBtn = document.getElementById("iniciarBtn");
    const nomeGrupo = document.getElementById("nomeGrupo");
    const turma = document.getElementById("turma");
    const integrantesInputs = document.querySelectorAll(".integrante");

    function validarFormulario() {
      const grupoValido = nomeGrupo.value !== "";
      const turmaValida = turma.value !== "";
      const peloMenosUmIntegrante = Array.from(integrantesInputs).some(
        input => input.value.trim().length > 0
      );
      iniciarBtn.disabled = !(grupoValido && turmaValida && peloMenosUmIntegrante);
    }

    nomeGrupo.addEventListener("change", validarFormulario);
    turma.addEventListener("change", validarFormulario);
    integrantesInputs.forEach(input => {
      input.addEventListener("input", validarFormulario);
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const turmaValor = turma.value.trim();
      const grupo = {
        nomeGrupo: nomeGrupo.value.trim(),
        turma: turmaValor,
        integrantes: Array.from(integrantesInputs)
          .map(input => input.value.trim())
          .filter(nome => nome !== "")
      };

      localStorage.setItem(`dadosGrupo_${turmaValor}_${grupo.nomeGrupo}`, JSON.stringify(grupo));
      localStorage.removeItem(`estacaoAtual_${turmaValor}_${grupo.nomeGrupo}`);
      localStorage.removeItem(`estacoesVisitadas_${turmaValor}_${grupo.nomeGrupo}`);
      localStorage.setItem("turmaAtual", turmaValor);
      localStorage.setItem("grupoAtual", grupo.nomeGrupo);

      window.location.href = "jogo.html";
    });
  }

  // === JOGO.HTML ===
  if (window.location.pathname.includes("jogo.html")) {
    const infoGrupo = document.getElementById("infoGrupo");
    const estacaoInicial = document.getElementById("estacaoInicial");
    const btnIrEstacao = document.getElementById("btnIrEstacao");

    const turmaAtual = localStorage.getItem("turmaAtual");
    const grupoAtual = localStorage.getItem("grupoAtual");
    const grupo = JSON.parse(localStorage.getItem(`dadosGrupo_${turmaAtual}_${grupoAtual}`));

    const estacoes = [
      { nome: "Estação 1", coord: "(5, 2)", arquivo: "estacao1.html" },
      { nome: "Estação 2", coord: "(0, 0)", arquivo: "estacao2.html" },
      { nome: "Estação 3", coord: "(11, 0)", arquivo: "estacao3.html" },
      { nome: "Estação 4", coord: "(13, 8.5)", arquivo: "estacao4.html" },
      { nome: "Estação 5", coord: "(3, 10)", arquivo: "estacao5.html" },
      { nome: "Estação 6", coord: "(4, 14)", arquivo: "estacao6.html" },
      { nome: "Estação 7", coord: "(13, 15)", arquivo: "estacao7.html" },
      { nome: "Estação 8", coord: "(12, 18)", arquivo: "estacao8.html" },
      { nome: "Estação 9", coord: "(16, 19)", arquivo: "estacao9.html" }
    ];

    if (!grupo || !turmaAtual || !grupoAtual) {
      window.location.href = "index.html";
      return;
    }

    infoGrupo.innerText = `Grupo: ${grupo.nomeGrupo} | Turma: ${grupo.turma}`;

    let estacaoSorteada = JSON.parse(localStorage.getItem(`estacaoInicial_${turmaAtual}_${grupoAtual}`));
    if (!estacaoSorteada) {
      const indice = Math.floor(Math.random() * estacoes.length);
      estacaoSorteada = estacoes[indice];
      localStorage.setItem(`estacaoInicial_${turmaAtual}_${grupoAtual}`, JSON.stringify(estacaoSorteada));
      localStorage.setItem(`estacaoAtual_${turmaAtual}_${grupoAtual}`, JSON.stringify(estacaoSorteada));
    }

    estacaoInicial.innerText = `Sua estação inicial é: ${estacaoSorteada.nome} - Coordenada: ${estacaoSorteada.coord}`;

    btnIrEstacao.addEventListener("click", () => {
      localStorage.setItem(`estacaoAtual_${turmaAtual}_${grupoAtual}`, JSON.stringify(estacaoSorteada));
      window.location.href = `estacao/${estacaoSorteada.arquivo}`;
    });
  }
});
