/* importar as configura��es do servidor */
var app = require("./config/server.js");

/* parametrizar a porta de escuta */
app.listen(8091, function () {
    console.log("Servidor Online");
});