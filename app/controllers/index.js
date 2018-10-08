module.exports.index = function(application ,req, res){

    res.render('index', {validacao : {}, usuario: {}});

};


module.exports.autenticar = function(application ,req, res){

    var dadosForm = req.body;
    console.log(dadosForm);

    req.assert('usuario', "Usuário não deve ser vazio").notEmpty();
    req.assert('senha', "Senha não deve ser vazio").notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.render('index', {validacao : erros, usuario: {}});
        return;
    };

    var usuarioDAO = new application.app.models.UsuariosDAO(application);
    usuarioDAO.autenticar(dadosForm, req, res);

};
