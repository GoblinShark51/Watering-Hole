const express = require('express');
const app = express();
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use('/build', express.static(path.join(__dirname, '../build')));
app.get('/build/bundle.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build/bundle.js'));
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

//////////////////////

// route 
app.get()

app.use((req, res) => {
    res.status(404).send('404: Page not found')
})

app.use

app.listen(3000);