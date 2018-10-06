function JogoDAO(application){
    console.log('jogodao');
	this._modelJogo = application.app.models.JogoModel();

};

JogoDAO.prototype.gerarParametros = function(usuario){
    var modelJogo = this._modelJogo({
        usuario: usuario,
        moeda: 15,
        suditos: 10,
        temor: Math.floor(Math.random() * 1000),
        sabedoria: Math.floor(Math.random() * 1000),
        comercio: Math.floor(Math.random() * 1000),
        magia: Math.floor(Math.random() * 1000)
    });

	modelJogo.save(function(err, newGame){
		if(err){
			return console.error(err);
        };
	});
};

JogoDAO.prototype.iniciaJogo = function(usuario, res, casa, msg){
    var modelJogo = this._modelJogo;
    modelJogo.find({ usuario: usuario }, function (err, docs){
        res.render('jogo', {img_casa: casa, jogo: docs[0], msg: msg});
    });
};
module.exports = function(){
    return JogoDAO;
};
