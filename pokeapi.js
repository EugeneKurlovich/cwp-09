const Promise = require('bluebird');
const axios = require('axios');

axios.get('http://pokeapi.co/api/v2/pokemon/42')
    .then(function (response) {
        console.log(`name: ${response.data.name}, weight: ${response.data.weight}, height: ${response.data.height}`);
    });
