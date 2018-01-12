var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var ioChat = io.of('/chat');
ioChat.on('connection', function(socket){
  console.log('a user connected');

  socket.on('chatMessage', function(msgObj){
    console.log('message from ' + msgObj.user + ': ' + msgObj.txt);
    ioChat.emit('chatMessage', msgObj);
  });

  socket.on('typing', function(msg){
    //console.log('typing...' + msg);
    ioChat.emit('typing', msg);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
    ioChat.emit('chatMessage', 'a user disconneced');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
