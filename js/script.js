// **Consegna**
// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.


/** SVOLGIMENTO
Al click su button play --> funzione startGame
    Nacondere il titolo h2
    Mostrare la griglia, quindi prima devo generarla
        Creare dinamicamente 100 square --> funzione createSquare
            creare l'elemento
            aggiungere la classe
            inserire il numero che è nello span
            appendo lo square alla grid
            al click sullo square
                aggiungere click listener --> al click cambia colore e stampa numero in console

    Dopo che la griglia è stata generata devo mostrarla
*/


// Prelevare il button e aggiungere event listner
document.getElementById("btn-play").addEventListener("click", startGame); // startGame è la funzione principale del gioco

const mainTitle = document.getElementById("main-title");
const mainGrid = document.getElementById("grid");


// FUNCTIONS

function startGame() {
    // Nacondere il titolo h2
    mainTitle.classList.add("hide");
    // ripulire la griglia
    mainGrid.innerHTML = "";
    // ciclo for per creare 100 numeri
    for (let i = 1; i <= 100; i++) {
        // richiamo la funzione che crea gli square e mette all'interno i numeri
        const newSquare = createSquare(i);
        // al click sullo square
        newSquare.addEventListener("click", clickSquare)
        // appendo lo square alla grid
        mainGrid.append(newSquare);
    }
    // Mostrare la griglia
    mainGrid.classList.remove("hide");
}

// Creare dinamicamente 100 square con una funzione
/**
 * Description: funzione che crea un elemento html che rappresenta un quadrato della griglia, lo Square del Grid
 * @param {number} numero dell'elemento html da mostrare
 * @returns {object} elemento html
 */
function createSquare(innerNumber){
    // creare l'elemento
    const square = document.createElement("div");
    // aggiungere la classe
    square.classList.add("square");
    // inserire il numero nello square
    square.innerHTML =`<span>${innerNumber}</span>`
    return square;
}

// funzione che mi mostra lo square di colore diverso al click
function clickSquare() {
    this.classList.add("clicked");
    console.log(this.textContent);
}
