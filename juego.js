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
const btnPedir = document.querySelector("#btnPedir");
const small = document.querySelectorAll("small");

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

const valor = valorCarta(pedirCarta());

//Eventos
btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();
  puntosJugador += valorCarta(carta);
  console.log(puntosJugador);
  small[0].innerText = puntosJugador;
});
