/* Number Facts ---------------------------------------------*/

const baseURL = "http://numbersapi.com/"

/* ----Favorite Number -----
Make a request to the Numbers API (http://numbersapi.com/) to get 
a fact about your favorite number. (Make sure you get back JSON by 
including the json query key, specific to this API. */
const favorite = document.getElementById("favorite");
let favURL = baseURL + 24 + '?json';

let favNumberPromise = axios.get(favURL);

favNumberPromise
    .then(resp => {
        favorite.innerHTML = `${resp.data.text}`;
    })
    .catch(err => console.log(err));

/* ----Multiple Numbers in a Single Request -----
Figure out how to get data on multiple numbers in a single request. 
Make that request and when you get the data back, put all of 
the number facts on the page.*/

const multipleFacts = document.getElementById("facts");
let multipleURL = baseURL + '5,10,15,20,15?json';

let multipleNumbersPromise = axios.get(multipleURL);

multipleNumbersPromise
    .then(resp => {
        const data = resp.data;
        for (const key in data) {
            const newLi = document.createElement("li");
            newLi.innerText = `${data[key]}`;
            multipleFacts.append(newLi);
        }

    })
    .catch(err => console.log(err));

/* ----Multiple Requests for a Single Number -----
Use the API to get 4 facts on your favorite number. 
Once you have them all, put them on the page. It’s okay if 
some of the facts are repeats.
(Note: You’ll need to make multiple requests for this.) */
let fourFactsPromises = [];
let favMultiReqURL = baseURL + 7 + '?json';
const same = document.getElementById("same");

for (let i = 1; i < 5; i++) {
    fourFactsPromises.push(
        axios.get(favMultiReqURL)
    );
}

Promise.all(fourFactsPromises)
    .then(favNumFacts => (
        favNumFacts.forEach(fact => {
            const newLi = document.createElement("li");
            newLi.innerText = fact.data.text;
            same.append(newLi);
        })
    ))
    .catch(err => console.log(err));