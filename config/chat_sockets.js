module.exports.chatSockets = function(socketServer)
{
  let io=require('socket.io')(socketServer,{
    cors: {
      origin: "http://localhost:8001",
      methods: ["GET", "POST"],
    //   allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });
//   io.set('origins','http://localhost:8001')
io.sockets.on('connection', function(socket){
    console.log('new connection received', socket.id);

    socket.on('disconnect', function(){
        console.log('socket disconnected!');
    });

    socket.on('join_room',function(data){
        console.log("joining request received",data);
        socket.join(data.chatroom);
        // to tell all the user that a new user has enetered the chatroom
        io.in(data.chatroom).emit('user_joined',data);
    })

    socket.on('send_message',function(data){
      io.in(data.chatroom).emit('receive_message',data);
    })

});
}
