const Promise = require('bluebird');
const axios = require('axios');

axios.get('http://pokeapi.co/api/v2/pokemon/42')
    .then(function (response) {
        console.log(`name: ${response.data.name}, weight: ${response.data.weight}, height: ${response.data.height}`);
    });


let requests = [];

for (let i = 0; i < 3; i++) 
{
    requests.push(axios.get(`http://pokeapi.co/api/v2/pokemon/?limit=10`));
}

Promise.all(requests)
    .then((results) => {
        results.forEach((val, resInd) => {
            val.data.results.forEach((pokemon, ind) => {
                console.log(`${resInd}${ind} - ${pokemon.name}`);
            });
            console.log('------------------\n');
        });
    })
    .catch((err) => {
        console.error(err);
    });