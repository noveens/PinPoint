var express = require("express");
var fs = require("fs");
var app = express();

app.get("/login", function(request, response) {
    var username = request.query.username;
    var password = request.query.password;

    fs.readFile('users.csv', function(err, data) {
        var users = data.toString().split('\n');
        var flag = 0;
        for(var i=0;i<users.length;i++) {
			var user = users[i].split(',');
            if (user[0] === username && user[1] === password) {
                flag = i+1;
                break;
            }
        }
        response.send(flag.toString());
    });
});

app.get("/register", function(request, response) {
    var username = request.query.username;
    var password = request.query.password;

    fs.appendFile('Users.csv', username + ',' + password + '\n', function(err) {
        if(err) {
            response.end("0");
        } else {
            response.send("1");
        }
    });
});

app.get("/sendLocation", function(request, response) {
   var problem = request.query.problem;
   var userId = request.query.userId;
   var x = request.query.x;
   var y = request.query.y;

   fs.appendFile('Location.csv', userId + ',' + ',' + x + ',' + y + ',' + problem + '\n', function(err) {
      if(err) {
           response.end("0");
      } else {
           response.send("1");
      }
   });
});
