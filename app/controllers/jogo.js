module.exports.jogo = function(application ,req, res){
    if(req.session.autorizado !== true){
        res.send('Usuário não autorizado');
        return;
    };

    var msg = '';

    if(req.query.msg != ''){
        msg = req.query.msg;
    };

    var usuario = req.session.usuario;
    var casa = req.session.casa;

    var jogoDAO = new application.app.models.JogoDAO(application);
    jogoDAO.iniciaJogo(usuario, res, casa, msg);

};

module.exports.sair = function(application ,req, res){

    req.session.destroy(function(err){
         res.render('index', {validacao : {}, usuario: {}});
    });
};

module.exports.suditos = function(application ,req, res){
    if(req.session.autorizado !== true){
        res.send('Usuário não autorizado');
        return;
    };
    res.render('aldeoes', {validacao : {}});
};

module.exports.pergaminhos = function(application ,req, res){
    if(req.session.autorizado !== true){
        res.send('Usuário não autorizado');
        return;
    };

    // Recuperar as ações do BD
    var usuario = req.session.usuario;

    var acaoDAO = new application.app.models.AcaoDAO(application);
    acaoDAO.getAcoes(usuario, res);

};

module.exports.ordenar_acao_sudito = function(application ,req, res){
    if(req.session.autorizado !== true){
        res.send('Usuário não autorizado');
        return;
    };

    var dadosForm = req.body;

    req.assert('acao', 'Ação deve ser informada').notEmpty();
    req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.redirect('/jogo?msg=a');
        return;
    };

    var acaoDAO = new application.app.models.AcaoDAO(application);

    dadosForm.usuario = req.session.usuario;
    acaoDAO.acao(dadosForm);


     res.redirect('/jogo?msg=b');
};
module.exports.revogar_acao = function(application ,req, res){
    var url_query = req.query;

     var acaoDAO = new application.app.models.AcaoDAO(application);

    var _id = url_query.acao_id;
    acaoDAO.revogarAcao(_id, res);
};
