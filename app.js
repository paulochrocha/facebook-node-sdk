var express = require('express');
var FB = require('fb');

var app = express();

app.get('/', function(req, res) {
    var _res = res;
    FB.api('oauth/access_token', {
        client_id: 'app_id',
        client_secret: 'app_secret',
        grant_type: 'client_credentials'
    }, function(resToken) {
        if (!resToken || resToken.error) {
            console.log(!resToken ? 'error occurred' : resToken.error);
            return;
        }

        var accessToken = resToken.access_token;
        FB.setAccessToken(accessToken);

        console.log('accessToken --> ', accessToken);

        FB.api('FacebookforDevelopers/albums', function(albums) {
            console.log('albums --> ', albums);
        });
    });
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
