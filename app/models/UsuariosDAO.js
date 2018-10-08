function UsuariosDAO(application){
	this._modelUser = application.app.models.UsuarioModel();

};

UsuariosDAO.prototype.inserirUsuario = function(usuario){
	var newUser = this._modelUser(usuario);

	newUser.save(function(err, newUser){
		if(err){
          return console.error(error);
		  console.log("Cadastro realizado com sucesso");
        };
	});
};

UsuariosDAO.prototype.exibirUsuarios = function(){
    this._modelUser.find(function (err, usuario) {
        if (err) return console.error(err);
    });
};

UsuariosDAO.prototype.autenticar = function(usuario, req, res){
    var user = this._modelUser;
    user.find({ usuario: usuario.usuario, senha: usuario.senha }, function (err, docs){
        if (err) return console.error(err);
        console.log(docs);
        if(docs[0] != undefined){
            req.session.autorizado = true;

            req.session.usuario = docs[0].usuario;
            req.session.casa = docs[0].casa;
        }else{
            res.render('index', {validacao : {}, usuario: usuario});
            console.log(usuario);
            return;
        };
        if(req.session.autorizado){
            res.redirect('jogo');
        }else{
            res.render('index', {validacao : {}, usuario: {}});
        };
    });
};
module.exports = function(){
    return UsuariosDAO;
}
