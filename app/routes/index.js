module.exports = function (application) {
    application.get("/", function (req, res) {
        // navegar até o controller e excutar a função que esta contida lá
        application.app.controllers.index.home(application, req, res);
    });
}