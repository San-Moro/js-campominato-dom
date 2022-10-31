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

/** SVOLGIMENTO parte 2
 * Aggiungere l'array bombs => di 16 numeri creati casualmente in un range da 1 a 100 - Attenta! non ci devono essere doppioni
 * Aggiungere l'array noBombs => 100-16 => contatore dei n. cliccati che non sono bombe => Punteggio
 * Al click sullo square
 *  controllare se il numero dello square cliccato è incluso nell'array bombs
 *      SE true => l'utente ha perso
 *          mostrare tutti gli square bombe e il punteggio
 *      ELSE SE false => controllare se ha cliccato tutti i numeri inclusi nell'array noBombs
 *          SE true => ha vinto
 *          ELSE
 *          può continuare a giocare
*/
/** FINE DEL GIOCO
 * Alla fine del gioco le celle non sono più cliccabili
 * SE l'utente ha vinto
 *      Output messaggio: "Complimenti! Hai vinto!"
 * ALTRIMENTI
 *      Output messaggio: "Ops! Hai perso!"
 *          Tutte le bombe sono visibili
 *
*/


// Prelevare il button e aggiungere event listner
document.getElementById("btn-play").addEventListener("click", startGame); // startGame è la funzione principale del gioco

const mainTitle = document.getElementById("main-title");
const mainGrid = document.getElementById("grid");

// // Rendere global scope gli array che si trovano dentro la funzione
//let bombsArray = [];

// FUNCTIONS
// Funzione principale del gioco
function startGame() {
    // n. Square
    const squareNumber = 100;
    // n.Bombe
    const bombsNumber = 16;

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

    // Array bombs => di 16 numeri creati casualmente non doppioni in un range da 1 a squareNumber
    let bombsArray = gntRndNumbersArray(bombsNumber, 1, squareNumber);
    console.log(bombsArray);
    // Calcolare il numero delgli square non bombe
    let safeSquare = 100 - bombsNumber;
    console.log(safeSquare);
    // Creare Array degli square non bombe cliccate
    const clickedSquare = [];

    
    // funzione che mi mostra lo square di colore diverso al click
    function clickSquare() {
        
        // leggo il numero del quaddrato cliccato
        const clickedNumber = parseInt(this.textContent);
        // SE il numero è contenuto nel bombsArray
        if (bombsArray.includes(clickedNumber)) {
            //la cella diventa rossa
            this.classList.add("bomb");
            //Utente ha perso
            endGame("lose");
        } else {
            this.classList.add("clicked");
            // SE non è stata già cliccata
            if (!clickedSquare.includes(clickedNumber)) {
                // salvo il numero nell'arry del punteggio
                clickedSquare.push(clickedNumber)
            }
            // SE la lunghezza dell'array di quadrati cliccati è uguale al safeSquare
            if (clickedSquare.length === safeSquare) {
                //Utente ha vinto 
                endGame("win");   
            }
        }
    }

/**
 * Description: la funzione che gestisce la fine del gioco
 * @param {string} winLose "win" se l'utente ha vinto , "lose" se ha perso
 */
    function endGame(winLose) {
        // Alla fine del gioco le celle non sono più cliccabili
        const allSquare = document.getElementsByClassName("square");
        for (let i = 0; i < allSquare.length; i++) {
            const thisSquare = allSquare[i];
            thisSquare.removeEventListener("click", clickSquare);
        }
        // SE l'utente ha vinto
        if (winLose === "win") {
            //Output messaggio: "Complimenti! Hai vinto!"
            alert ("Complimenti! Hai vinto!");
        } else {
            //  Tutte le bombe sono visibili
            for (let i = 0; i < allSquare.length; i++) {
                const thisSquare = allSquare[i];
                //Prendo il numero del quadrato
                const thisSquareNumber = parseInt(thisSquare.textContent);
                // SE il numero è contenuto nell'array bombs
                if (bombsArray.includes(thisSquareNumber)) {
                    // coloro di rosso
                    thisSquare.classList.add("bomb");
                }
            }
            // mostrare Output messaggio: "Ops! Hai perso!"
            alert (`Ops! Hai perso con il punteggio ${clickedSquare.length}`);
        }
    }
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


/**
 * Description: funzione che genera array di numeri random senza doppioni compresi nel range dato
 * @param {number} totalNumbers la lunghezza dell'array
 * @param {number} min limite minimo per i numeri da generare
 * @param {number} max limite massimo per i numeri da generare
 * @returns {Array} array di numeri random non duplicati
 */
function gntRndNumbersArray(totalNumbers, min, max) {
    // finchè l'array non ha la lunghezza del totalNumbers
    const resultArray = [];
    while (resultArray.length < totalNumbers) {
        // generare un numero random
        const rndNumber = getRndInteger(min, max);
        // SE non è presente nell'array
        if (!resultArray.includes(rndNumber)) {
            //     pushare nell'array
            resultArray.push(rndNumber);
        }
    }
    return resultArray;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}