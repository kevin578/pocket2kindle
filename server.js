var GetPocket = require('node-getpocket');
const express = require('express');
var app = express();


app.get('/', (req, res)=> {
var config = {
    //consumer_key: '76779-2d1f99177e5c5324c1846fca',
    redirect_uri: 'http://localhost:3000/',
    
};
 
var pocket = new GetPocket(config);
var params = {
    consumer_key: '76779-2d1f99177e5c5324c1846fca',
    redirect_uri: 'http://localhost:3000/',
};

pocket.getRequestToken(params, function(err, resp, body) {
    if (err) {
        console.log('Oops; getTokenRequest failed: ' + err);
    }
    else {
        // your request token is in body.code 
        var json = JSON.parse(body);
        var request_token = json.code;
        console.log();
    }
    var config = {
        consumer_key: '76779-2d1f99177e5c5324c1846fca',
        request_token: request_token,
        redirect_uri: 'http://localhost:3000/',

    };
    var url = pocket.getAuthorizeURL(config);
    
    //console.log(url)

    res.redirect(url);


});

});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));




