var GetPocket = require('node-getpocket');
const express = require('express');
var request = require("request");
var app = express();
var axios = require('axios')


var request_token;
var consumer_key = '76779-2d1f99177e5c5324c1846fca';
var access_token;
var redirect_uri ;

var options = { method: 'POST',
  url: 'https://getpocket.com/v3/oauth/request',
  headers: 
   { 'Postman-Token': 'fb683075-bdab-4e4b-bcb7-477ea80c10ee',
     'Cache-Control': 'no-cache',
     'X-Accept': 'application/json',
     'Content-Type': 'application/x-www-form-urlencoded' },
  form: 
   { consumer_key: '76779-2d1f99177e5c5324c1846fca',
     redirect_uri: 'http://localhost:3000/' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  res.redirect(`https://getpocket.com/auth/authorize?request_token=${body.code}&redirect_uri=${redirect_uri}`);
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));




