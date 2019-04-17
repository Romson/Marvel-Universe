const express = require('express');
const app = express();

// Serve files in public folder
app.use(express.static('public'));

// Server ejs files
app.set('view engine', 'ejs');

// Make API calls
const request = require('request');

// Require Body Parser
const bodyParser = require('body-parser');
// Tell Express to use Body Parser
app.use(bodyParser.urlencoded({extended: true}));

// Array of Heroes
const heroes = [
        {name: 'WOLVERINE', image: 'https://i.annihil.us/u/prod/marvel/i/mg/2/60/537bcaef0f6cf/standard_xlarge.jpg'},
        {name: 'CAPTAIN AMERICA', image: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/ultimate_cap_hed.jpg'},
        {name: 'SPIDER-MAN', image: 'https://i.annihil.us/u/prod/marvel/i/mg/9/30/538cd33e15ab7/standard_xlarge.jpg'},
        {name: 'GAMBIT', image: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/gambit442.jpg'},
        {name: 'AJAXIS', image: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/ajaxis_head.jpg'},
        {name: 'GHOST RIDER', image: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/2099_ghostrider442.jpg'},
        {name: 'PHOENIX', image: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/jeangrey442.jpg'},
        {name: 'FRANKLIN RICHARDS', image: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/215frk_com_crd_03.jpg'}
];
    
// Root
app.get('/', (req, res) => {
   res.render('landing');
});

// Characters
app.get('/characters', (req, res) => {
   res.render('characters', {characters: heroes});
});

// Post route
app.post('/characters', (req, res) => {
    // Get form data and push to heroes array
    const name = req.body.name;
    const image = req.body.image;
    const newCharacter = {name: name, image: image};
    heroes.push(newCharacter);
    
    // Redirect to characters page
    res.redirect('/characters');
});

// RESTful route
app.get('/characters/new', (req, res) => {
    res.render('new');
});

app.listen(process.env.PORT, process.env.IP, () => {
    console.log('Marvel App running');
});