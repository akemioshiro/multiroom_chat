module.exports.iniciaChat = function (application, req, res) {
    var dadosForm = req.body; // utilzando o bodyparser

    // o express validator já esta incorporado
    req.assert("apelido", "Nome ou apelido é obrigatório").notEmpty();
    req.assert("apelido", "Nome ou apelido deve conter entre 3 e 15 caracteres").len(3, 15);
    
    // retorna os erros
    var erros = req.validationErrors();

    if (erros)
    {
        res.render("index", { validacao: erros });
        return;
    }


    res.render("chat");
}