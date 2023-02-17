import fetch from "node-fetch";
const fs = import('fs');

//********** Callbacks **********//

// setTimeout - tells js to call callback function some time in the future
    // takes a callback function, in this instance console.log
// setTimeout(() => {
//     console.log("5 seconds passed");
// }, 5000);

// nested setTimeout - callback hell
// setTimeout(() => {
//     console.log('3');
//     setTimeout(() => {
//         console.log('2');
//         setTimeout(() => {
//             console.log('1');
//         },1000);
//     },1000);
// }, 1000);

// btn event handler 
    // pass a callback function to have specific event execute (handeled)
    // registered for a click event
// let btn;

// btn.addEventListener('click', () => {
//     console.log('btn clicked!');
// });

// error first callback 
    //first arg is a file to read
    // second arg is encoding format 
    // third arg is a callback that takes to args
        // first is an error - if fails to read the file correctly
        // second is the data from the file to read
    // the function will end up console logging test.txt data 
// fs.readFile('./test.txt', {encoding: 'utf-8'}, (err, data) => {
//     if (err) {
//         console.error("ERROR!");
//         console.error(err);
//     } else {
//         console.log('SUCCESS!')
//         console.log(data);
//     }
// });

// // example of error because this file does not exist
// fs.readFile('./test2.txt', {encoding: 'utf-8'}, (err, data) => {
//     if (err) {
//         console.error("ERROR!");
//         console.error(err);
//     } else {
//         console.log('SUCCESS!')
//         console.log(data);
//     }
// });

//********** Promises **********//

// create a Promise
    // Promises always have a success and a fail path
    // passing a function that accespts resolve and reject callback 
// const myPromise = new Promise((res, rej) => {
//     const randomNumber = Math.floor(Math.random()*2); // either a 0 or 1

//     if (randomNumber === 1) {
//         res(); // calls resolve function 
//     } else {
//         rej(); // calls reject function
//     }

// });

// // myPromise.then(() => console.log("Success!")); // passing this handler to the .then only handles the success case 

// myPromise
// .then(() => console.log("Success!"))
// .catch(() => console.error("Something went wrong")); // handles the error case as well as success

// fs readFile with Promises - using an existing promise
// // success
// fs.promises
//     .readFile('./test.txt', {encoding: 'utf-8'})
//     .then((data) => console.log(data))
//     .catch((err) => console.error(err));

// // error because this file does not exist 
// fs.promises
//     .readFile('./test2.txt', {encoding: 'utf-8'})
//     .then((data) => console.log(data))
//     .catch((err) => console.error(err));

// fetch with Promises
// fetch('https://pokeapi.co/api/v2/pokemon/ditto')
//     .then((res) => res.json()) // this handles success case; res.json returns a promise so can be chained to another .then
//     .then(data => console.log(data)) // Promise .then handles a Promise that comes bakc from res.json    
//     .catch((err) => console.error(err));

//********** Asych/Await **********//

// load file with async/await
    // define a loadFile function because we have ot mark the function as async to use the capability

    // success example
const loadFile1 = async () => {
    const data = await (await fs).promises.readFile('./test.txt', { // calls fs.readFile, instead of .then or promise -> use await keyword to get the data
        encoding: 'utf-8',
    }
    );
    console.log(data);
};
// loadFile1();

    // error example (test2.txt does not exist)
const loadFile2 = async () => {
    // tries to run code and if not possible -> catches err
    try {
        const data = await (await fs).promises.readFile('./test2.txt', { // calls fs.readFile, instead of .then or promise -> use await keyword to get the data
            encoding: 'utf-8',
        }
        );
        console.log(data);
    } catch (err) {
        console.error(err);
    }
};
// loadFile2();

// fetch with async /await without error handling 
const fetchPokemon1 = async (id) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`); // makes a fetch request here, it awaits the response
    const data = await res.json(); // then it awaits res.json (res.json returns promise so we can await that response)
    console.log(data); // before it console.logs the data that came back
};
// fetchPokemon1(2); // id is an id of the pokemon (2 is for ivysaur)

// fetch with async /await with error handling with try/catch
const fetchPokemon2 = async (id) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`); 
        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.error(err);
    }
};
fetchPokemon2(); // when id is not passed it causes error ('undefined in the url of the api request')