var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.broadcast.emit('hi');
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
        if (msg){
            io.emit('chat message', msg);
        }
    });
});

http.listen(3000, function(){
    console.log('Abierta en el puerto 3000');
});

io.emit('some event', { for: 'everyone' 
});
