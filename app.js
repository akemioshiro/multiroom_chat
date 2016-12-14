/* importar as configurações do servidor */
var app = require("./config/server.js");

/* parametrizar a porta de escuta */
var server = app.listen(8091, function () {
    console.log("Servidor Online");
});

// na porta 8091 possui requisições http e websockets
var io = require("socket.io").listen(server);

app.set("io", io);

/* criar a conexão por websocket */
io.on("connection", function (socket) {
    console.log("O usuário conectou");

    socket.on("disconnect", function () {
        console.log("O usuário desconectou");
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