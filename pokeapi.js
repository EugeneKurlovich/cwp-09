const Promise = require('bluebird');
const axios = require('axios');



axios.get('http://pokeapi.co/api/v2/pokemon/42')
    .then(function (response) {
        console.log("42 pokemon");
        console.log(`name: ${response.data.name}, weight: ${response.data.weight}, height: ${response.data.height}`);
        console.log('------------------------');
    });


    let pokemons = [];
    
    for (let i = 0; i < 3; i++) 
    {
        pokemons.push(axios.get("http://pokeapi.co/api/v2/pokemon/?limit=10&offset=" + i * 10));
    }

Promise.all(pokemons)
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


Promise.any([
    axios.get('http://pokeapi.co/api/v2/pokemon/1'),
    axios.get('http://pokeapi.co/api/v2/pokemon/4'),
    axios.get('http://pokeapi.co/api/v2/pokemon/7'),
]).then((value) => {
    console.log("из [1, 4, 7] первым был: " + value.data.name);
}).catch((error) => {
    console.error(error);
});    



Promise.props({
    pokemons: axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=10`),
    items: axios.get(`https://pokeapi.co/api/v2/item/?limit=10`),
    locations: axios.get(`https://pokeapi.co/api/v2/location/?limit=10`)
}).then((result) => {
    Object.values(result).forEach((prop) => {
        prop.data.results.forEach((val) => {
            console.log(val.name);
        });
        console.log('------------------\n');
    })
}).catch((error) => {
    console.error(error);
});


Promise.map([1, 2, 3, 4], (id) => { 
    return axios.get(`https://pokeapi.co/api/v2/berry/${id}`);
}).then((result) => {
    result.forEach((val) => {
        console.log(val.data.name);
    });
});