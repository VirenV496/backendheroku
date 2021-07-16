const express = require('express');
const route = express.Router();
var Linkedin = require('node-linkedin')('78k04zycrk00up', '9ax4SCz3FdcgzSXy');
Linkedin.auth.setCallback("http://localhost:3000/oauth/linkedin/callback");




// Initialize 
var scope = ['r_basicprofile', 'r_fullprofile', 'r_emailaddress', 'r_network', 'r_contactinfo', 'rw_nus', 'rw_groups', 'w_messages'];



var linkedinVariables = {
    'accessToken': null,
    'client': null
}


route.get('/', (req, res)=>{
      res.send("Hello")
})


route.get('/oauth/linkedin', function(req, res) {
    // This will ask for permisssions etc and redirect to callback url. 
    Linkedin.auth.authorize(res, scope);
    
});



// app.get('/oauth/linkedin', function(req, res) {
//     // set the callback url
//     Linkedin.setCallback(req.protocol + '://' + req.headers.host + '/oauth/linkedin/callback');
//     Linkedin.auth.authorize(res, scope);
// });

route.get('/oauth/linkedin/callback', function(req, res) {
    Linkedin.auth.getAccessToken(req.query.code, req.query.state, "http://localhost:3000/oauth/linkedin/callback", function(err, results) {
        console.log("code err");
        if (err)
            return console.error(err);
           
        console.log(results);

        linkedinVariables.accessToken = results.access_token;

        console.log("ACCESS TOKEN IS ", linkedinVariables.accessToken);

        linkedinVariables.client = Linkedin.init(linkedinVariables.accessToken);


        linkedinVariables.client.people.id('78k04zycrk00up', function(err, $in) {
            console.log($in)
        });
        return res.redirect('/');

        // Linkedin.connections.retrieve(function(err, connections) {
        //     console.log(connections);
        // });


    });
});


module.exports = route;