const express = require('express');
const app = express();
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use('/', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});



// app.use(
//     '/',
//     createProxyMiddleware({
//       target: 'http://www.example.org/secret',
//       changeOrigin: true,
//     })
//   );
  

app.listen(3000);