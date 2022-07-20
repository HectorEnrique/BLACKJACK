/*
 * 2C = Two of Clubs
 * 2D = Two of Diamins
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];
let puntosJugador = 0;
let puntosComputadora = 0;

//Referencias HTML
const small = document.querySelectorAll("small");
const addCartasJugador = document.querySelector("#jugador__cartas");
const addCartasPc = document.querySelector("#computadora__cartas");
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnStop");
const btnNuevo = document.querySelector("#btnNuevo");

// Esta función crea un nuevo deck
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }
  deck = _.shuffle(deck);
  return deck;
};

crearDeck();

//Esta funcion me permite tomar una carta
const pedirCarta = () => {
  if (deck.length === 0) {
    throw "No hay cartas en el deck"; //Esto por si acaso
  }
  let carta = deck.pop();
  return carta;
};

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor == "A" ? 11 : 10) : Number.parseInt(valor);
};

//turno pc
const turnoPc = (puntosMinimos) => {
  do {
    const carta = pedirCarta();
    puntosComputadora += valorCarta(carta);
    console.log(puntosComputadora);
    small[1].innerText = puntosComputadora;

    const imgCarta = document.createElement("img");
    imgCarta.classList.add("carta");
    imgCarta.src = `assets/cartas/${carta}.png`;
    addCartasPc.append(imgCarta);
    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
  setTimeout(() => {
    if (puntosComputadora === puntosMinimos) {
      alert("Nadie gana");
    } else if (puntosComputadora > 21) {
      alert("Perdio maquina");
    } else if (puntosJugador > 21) {
      alert("Perdio jugador");
    } else {
      alert("Gano Maquina ");
    }
  }, 50);
};

//Eventos
btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();
  puntosJugador += valorCarta(carta);
  // console.log(puntosJugador);
  small[0].innerText = puntosJugador;

  const imgCarta = document.createElement("img");
  imgCarta.classList.add("carta");
  imgCarta.src = `assets/cartas/${carta}.png`;
  addCartasJugador.append(imgCarta);

  if (puntosJugador > 21) {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoPc(puntosJugador);
  } else if (puntosJugador === 21) {
    console.warn("21, GANASTE");
    btnDetener.disabled = true;
    btnPedir.disabled = true;
    turnoPc(puntosJugador);
  }
});

btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  turnoPc(puntosJugador);
});

btnNuevo.addEventListener("click", () => {
  console.clear();
  deck = [];
  crearDeck();
  puntosJugador = 0;
  puntosComputadora = 0;
  small[0].innerText = 0;
  small[1].innerText = 0;
  addCartasJugador.innerHTML = "";
  addCartasPc.innerHTML = "";

  btnPedir.disabled = false;
  btnDetener.disabled = false;
});
