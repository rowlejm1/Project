var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// route to index
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

// route to admin page
app.get('/admin', function(req, res){
    res.sendFile(__dirname + '/admin_page.html');
});

// hardcoded User 2
app.get('/user2', function(req, res){
    res.sendFile(__dirname + '/index2.html');
});

// hardcoded User 3
app.get('/user3', function(req, res){
    res.sendFile(__dirname + '/index3.html');
});

// print out chat message for all users
io.on('connection', function(socket){
    console.log('a user connected');
    
    socket.on('user connected', function(msg){
        io.emit('user connected', msg);
    })

    socket.on('chat message', function(msg){
        console.log('a message was sent');    

        var i = msg.search('help');
        var help = msg.substring(i, i+4);

        var j = msg.search(':');
        var name = msg.substring(0, j);

        if(help == 'help')
        {
            console.log(name + ' needs help');
            io.emit('admin message', name);
        }

        io.emit('chat message', msg);
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});