// Setup Express
const express = require('express')
const app = express()

// Initialize the main project folder
app.use(express.static('dist'))

// Generate app home page
const path = require('path')
app.get('/', (req, res) => {
    res.sendFile('dist/index.html')
});

// Create express server
const PORT = 8080
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Listening on port ${PORT}`)
})