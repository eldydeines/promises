/* Deck of Cards ---------------------------------------------*/
let deckId = "new"
const baseDeckURL = "http://deckofcardsapi.com/api/deck/"

/* ---------Single Card -----------
Make a request to the Deck of Cards API to request a single card
from a newly shuffled deck. Once you have the card, console.log
the value and the suit (e.g. “5 of spades”, “queen of diamonds”). */

let oneDeckURL = baseDeckURL + `${deckId}/draw/?count=1`;
let oneCardPromise = axios.get(oneDeckURL);

oneCardPromise
    .then(resp => {
        console.log("DeckId= ", resp.data.deck_id)
        console.log(`Suit: ${resp.data.cards[0]['suit']}, Value: ${resp.data.cards[0]['value']}`);
    })
    .catch(err => console.log(err));

/* ---------Second Card -----------
Make a request to the deck of cards API to request a single card
from a newly shuffled deck. Once you have the card, make a request
to the same API to get one more card from the same deck.
Once you have both cards, console.log the values and suits of both cards.*/

let twoDeckURL = baseDeckURL + `${deckId}/draw/?count=1`;
let card1, card;
axios.get(twoDeckURL)
    .then(c1 => {
        card1 = c1
        deckId = c1.data.deck_id;
        return axios.get(twoDeckURL);
    })
    .then(c2 => {
        card2 = c2;
        console.log(`First Card: ${card1.data.cards[0]['suit']} ${card1.data.cards[0]['value']}`);
        console.log(`Second Card: ${card2.data.cards[0]['suit']} ${card2.data.cards[0]['value']}`);
    })
    .catch(err => console.log(err));


/* ----------Full Deck-----------
Build an HTML page that lets you draw cards from a deck. When the page loads, 
go to the Deck of Cards API to create a new deck, and show a button on the
page that will let you draw a card. Every time you click the button, 
display a new card, until there are no cards left in the deck.*/

//get a new deck
deckId = "new"
let playDeckURL = baseDeckURL + `${deckId}/draw/?count=52`;
let gameDeck;
let counter = 0;

//get deck
axios.get(playDeckURL)
    .then(deck => {
        gameDeck = deck.data;
    })
    .catch(err => console.log(err));

//get elements
const cardImage = document.getElementById("card-img");
const cardBtn = document.getElementById("card-btn");
const cardH3 = document.getElementById("card-h3");

//function for getting new card
function getCard() {

    card = gameDeck.cards[counter]
    cardImage.setAttribute("src", `${card['image']}`);

    if (counter == 52) {
        cardBtn.removeEventListener("click", getCard);
    }
    else {
        counter++;
        console.log(card['suit'], card['value']);
    }
    cardH3.innerText = `Card ${counter} of 52`;
};

cardBtn.addEventListener("click", getCard);
