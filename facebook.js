var request = require('request');

function getAllPhotos(response) {
    // Specify the URL and query string parameters needed for the request
    //var url = 'https://graph.facebook.com/599182390116897/photos'; //for one particular album?
    //https://developers.facebook.com/tools/explorer?method=GET&path=599168126784990%2Falbums%3Ffields%3Did%2Cname%2Cphotos.fields(id%2Cimages%2Clikes)
    var url = 'https://graph.facebook.com/599168126784990/albums'; //for spc
    // id for shawnaspapercreations is 599168126784990
    var params = {
        //access_token: access_token,
        fields: 'id,name,photos.fields(id,images,likes)'
    };

	// Send the request for albums
    request.get({url: url, qs: params}, function(err, resp, body) {
      
      // Handle any errors that occur
      if (err) return console.error("Error occured: ", err);
      body = JSON.parse(body);
      if (body.error) return console.error("Error returned from facebook: ", body.error);

      // Generate output
      var output = '<p>Here is the response body:</p>';
      output += '<pre>' + JSON.stringify(body.data[0].photos.data[0].images[0].source, null, '\t') + '</pre>';
      output += '<br> <img src=' + JSON.stringify(body.data[0].photos.data[0].images[0].source, null, '\t') + ' />';

      var imgArray = [], name = '';
      //name = body.data[0].from.name ? body.data[0].from.name : '';
      body.data.forEach(function (v) {
        
        if(v.photos && v.photos.data){
          //console.log(v.photos);
          v.photos.data.forEach(function(vv){
            if(vv.images && vv.images[0]){
              //console.log(vv.images[0]);
              imgArray.push({"source": vv.images[0].source, "height": vv.images[0].height, "width": vv.images[0].width});
            }
          });
        }
      });

      var cleanedJSON = {"name": name, "description": "", "photos": imgArray}
      console.log(cleanedJSON);
      //return cleanedJSON;

      // send cleanedJSON to render
      response.render('home',cleanedJSON);
      
      // Send output as the response
      //response.writeHeader(200, {'Content-Type': 'text/html'});
      //response.end(output);


    });

}

function postMessage(access_token, message, response) {
    // Specify the URL and query string parameters needed for the request
    var url = 'https://graph.facebook.com/me/feed';
    var params = {
        access_token: access_token,
        message: message
    };

	// Send the request
    request.post({url: url, qs: params}, function(err, resp, body) {
      
      // Handle any errors that occur
      if (err) return console.error("Error occured: ", err);
      body = JSON.parse(body);
      if (body.error) return console.error("Error returned from facebook: ", body.error);

      // Generate output
      var output = '<p>Message has been posted to your feed. Here is the id generated:</p>';
      output += '<pre>' + JSON.stringify(body, null, '\t') + '</pre>';
      
      // Send output as the response
      response.writeHeader(200, {'Content-Type': 'text/html'});
      response.end(output);
    });

}

exports.postMessage = postMessage;
exports.getAllPhotos = getAllPhotos;


