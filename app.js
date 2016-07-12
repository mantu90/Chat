var express = require('express');
var app = express();
var port = 80;


app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

app.get("/", function(req, res){
    res.render("page");
});

app.use(express.static(__dirname + '/public'));


var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function (socket) {
    // Join chat
    console.log('Socket succesfully connected with id: '+socket.id);
    // Welcome chat text
    socket.emit('message', { message: 'Welcome to the chat!' });
    console.log('a user connected');

    // Disconnect chat
    socket.on('disconnect', function(){
    	console.log('user disconnected');
    });
    
    // Send message
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});

console.log("Listening on port " + port);
