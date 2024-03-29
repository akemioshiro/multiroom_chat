/* importar as configura��es do servidor */
var app = require("./config/server.js");

/* parametrizar a porta de escuta */
var server = app.listen(8091, function () {
    console.log("Servidor Online");
});

// na porta 8091 possui requisi��es http e websockets
var io = require("socket.io").listen(server);

app.set("io", io);

/* criar a conex�o por websocket */
io.on("connection", function (socket) {
    console.log("O usu�rio conectou");

    socket.on("disconnect", function () {
        console.log("O usu�rio desconectou");
    });

    socket.on("msgParaServidor", function (data) {
        /* dialogos */
        socket.emit("msgParaCliente",
            { apelido: data.apelido, mensagem: data.mensagem }
        );

        socket.broadcast.emit(
            "msgParaCliente",
            { apelido: data.apelido, mensagem: data.mensagem }
        );


        /* atualizar participantes */
        if (parseInt(data.apelido_atualizado_nos_clientes) == 0) {
            socket.emit(
                "participantesParaCliente",
                { apelido: data.apelido, mensagem: data.mensagem }
            );

            socket.broadcast.emit(
                "participantesParaCliente",
                { apelido: data.apelido, mensagem: data.mensagem }
            );
        }
    });


});