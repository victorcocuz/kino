// Imports
const fetch_movies = require('./fetch_movies')

// Setup Express
const express = require('express')
const app = express()

// Initialize the main project folder
app.use(express.static('dist'));

// Setup Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create express server
const PORT = 8081
const server = app.listen(PORT, '0.0.0.0', () => console.log(`Listening on port ${PORT}`))

// Endpoints
const path = require('path')
app.get('/', (req, res) => {
    res.sendFile('dist/index.html') // Generate app home page
});

app.post('/getMovies', async (req, res) => {
    const inputs = req.body.data
    const movies = await fetch_movies.getMovies(inputs.eventStart, inputs.eventEnd, inputs.yearStart, inputs.yearEnd)
    res.send(movies);
})

module.exports = server