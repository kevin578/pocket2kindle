const express = require('express');
var request = require("request");

var app = express();


var request_token;
var consumer_key = '76779-2d1f99177e5c5324c1846fca';
var access_token;
var userName;
var redirect_uri = 'http://localhost:3000/';

app.get('/api/checkLoggedin', (req, res)=> {
    const hasRequestToken = request_token ? true : false;
    const hasAccessToken = access_token ? true : false;

    res.json({
        hasRequestToken,
        hasAccessToken
    })
})

app.get('/api/getRequestToken', (req, res)=> {
var options = { 
  method: 'POST',
  url: 'https://getpocket.com/v3/oauth/request',
  headers: 
   { 'Cache-Control': 'no-cache',
     'X-Accept': 'application/json',
     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  form: 
   { consumer_key: '76779-2d1f99177e5c5324c1846fca',
     redirect_uri: redirect_uri } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
    request_token = JSON.parse(body).code
    res.redirect(`https://getpocket.com/auth/authorize?request_token=${request_token}&redirect_uri=${redirect_uri}`);
});

})

app.get('/api/getAccessToken', (req, res)=> {
    var options = { 
        method: 'POST',
        url: 'https://getpocket.com/v3/oauth/authorize',
        headers: 
         { 'Cache-Control': 'no-cache',
           'X-Accept': 'application/json',
           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        form: 
        {"consumer_key": consumer_key,
        "code": request_token} };
      
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        access_token = JSON.parse(body).access_token;
        userName = JSON.parse(body).userName;
        res.redirect(redirect_uri)
      });    
})

app.get('/api/getStories', (req,res)=> {
    var request = require("request");

    var options = { 
      method: 'POST',
      url: 'https://getpocket.com/v3/get',
      headers: {
         'X-Accept': 'application/json',
         'Content-Type': 'application/x-www-form-urlencoded' 
      },
      form: { 
         consumer_key: consumer_key,
         access_token: access_token 
       } 
    };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      res.send(body)
    });

})




const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));




