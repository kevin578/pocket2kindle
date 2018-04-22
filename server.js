var GetPocket = require('node-getpocket');
const express = require('express');
var app = express();



var request_token;
var consumer_key = '76779-2d1f99177e5c5324c1846fca';
var access_token;


app.get('/getstories', (req, res)=> {
    
    var config = {
        consumer_key: consumer_key,
        access_token: access_token
    };
    var pocket = new GetPocket(config);
    
    pocket.refreshConfig(config);




    var params = {
        consumer_key: consumer_key,
        access_token: access_token
    };
    pocket.get(params, function(err, resp) {
        // check err or handle the response 
        console.log(params)
        res.json(resp)

    });
})

app.get('/', (req, res)=> {

    var config = {
    consumer_key: '76779-2d1f99177e5c5324c1846fca',
    redirect_uri: 'http://localhost:5000/pocketredirect',
    
};
 
var pocket = new GetPocket(config);
var params = {
    consumer_key: '76779-2d1f99177e5c5324c1846fca',
    redirect_uri: 'http://localhost:5000/pocketredirect',
};

pocket.getRequestToken(params, function(err, resp, body) {
    if (err) {
        console.log('Oops; getTokenRequest failed: ' + err);
    }
    else {
        // your request token is in body.code 
        var json = JSON.parse(body);
        request_token = json.code;
    }
    var config = {
        consumer_key: '76779-2d1f99177e5c5324c1846fca',
        request_token: request_token,
        redirect_uri: 'http://localhost:5000/pocketredirect',

    };
    var url = pocket.getAuthorizeURL(config);
    res.redirect(url);

});

app.get('/pocketredirect', (req, res)=> {
    var params = {
        request_token: request_token
    };
    pocket.getAccessToken(params, function(err, resp, body) {
        if (err) {
            console.log('Oops; getTokenRequest failed: ' + err);
        }
        else {
            // your access token is in body.access_token
            var json = JSON.parse(body);
            access_token = json.access_token;
            res.redirect('http://localhost:3000')
        }
    });
})



});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));




