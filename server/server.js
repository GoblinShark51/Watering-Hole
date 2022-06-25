const express = require('express');
const app = express();
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use('/', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

//////////////////////

// route 
app.get()

app.use((req, res) => {
    res.status(404).send('404: Page not found')
})

app.use((err, req, res, next) => {
    const globalErr = {
        log: 'Middleware error',
        status: 400,
        message: { err: 'An error occured'}
    }
    const error = Object.assign({}, globalErr, err);
    return res.status(error.status).json(error.message);
})

// app.use(
//     '/',
//     createProxyMiddleware({
//       target: 'http://www.example.org/secret',
//       changeOrigin: true,
//     })
//   );
  

app.listen(3000);