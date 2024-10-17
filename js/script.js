window.addEventListener("DOMContentLoaded", () => {
  const casillas = Array.from(document.querySelectorAll(".tile"));
  const mostrarJugador = document.querySelector(".display-player");
  const botonReiniciar = document.querySelector("#reset");
  const anunciador = document.querySelector(".announcer");

  let tablero = ["", "", "", "", "", "", "", "", ""];
  let jugadorActual = "X";
  let juegoActivo = true;

  const JUGADORX_GANO = "PLAYERX_WON";
  const JUGADORO_GANO = "PLAYERO_WON";
  const EMPATE = "TIE";

  const condicionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function manejarValidacionResultado() {
    let rondaGanada = false;
    for (let i = 0; i <= 7; i++) {
      const condicionGanadora = condicionesGanadoras[i];
      const a = tablero[condicionGanadora[0]];
      const b = tablero[condicionGanadora[1]];
      const c = tablero[condicionGanadora[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        rondaGanada = true;
        break;
      }
    }

    if (rondaGanada) {
      anunciar(jugadorActual === "X" ? JUGADORX_GANO : JUGADORO_GANO);
      juegoActivo = false;
      return;
    }

    if (!tablero.includes("")) anunciar(EMPATE);
  }

  const anunciar = (tipo) => {
    switch (tipo) {
      case JUGADORO_GANO:
        anunciador.innerHTML = 'Jugador <span class="playerO">O</span> gana';
        break;
      case JUGADORX_GANO:
        anunciador.innerHTML = 'Jugador <span class="playerX">X</span> gana';
        break;
      case EMPATE:
        anunciador.innerText = "Empate";
    }
    anunciador.classList.remove("hide");
  };

  const esAccionValida = (casilla) => {
    return casilla.innerText !== "X" && casilla.innerText !== "O";
  };

  const actualizarTablero = (indice) => {
    tablero[indice] = jugadorActual;
  };

  const cambiarJugador = () => {
    mostrarJugador.classList.remove(`player${jugadorActual}`);
    jugadorActual = jugadorActual === "X" ? "O" : "X";
    mostrarJugador.innerText = jugadorActual;
    mostrarJugador.classList.add(`player${jugadorActual}`);
  };

  const accionUsuario = (casilla, indice) => {
    if (esAccionValida(casilla) && juegoActivo) {
      casilla.innerText = jugadorActual;
      casilla.classList.add(`player${jugadorActual}`);
      actualizarTablero(indice);
      manejarValidacionResultado();
      cambiarJugador();
    }
  };

  const reiniciarTablero = () => {
    tablero = ["", "", "", "", "", "", "", "", ""];
    juegoActivo = true;
    anunciador.classList.add("hide");

    if (jugadorActual === "O") {
      cambiarJugador();
    }

    casillas.forEach((casilla) => {
      casilla.innerText = "";
      casilla.classList.remove("playerX");
      casilla.classList.remove("playerO");
    });
  };

  casillas.forEach((casilla, indice) => {
    casilla.addEventListener("click", () => accionUsuario(casilla, indice));
  });

  botonReiniciar.addEventListener("click", reiniciarTablero);
});