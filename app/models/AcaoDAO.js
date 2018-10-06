function AcaoDAO(application){
    this.actionJogo =  application.app.models.AcaoModel();
    this._modelJogo = application.app.models.JogoModel();
};


AcaoDAO.prototype.acao = function(acao){
    console.log('dwwwe');
    console.log(acao);

    var date = new Date();

    var tempo = null;

    switch(parseInt(acao.acao)){
        case 1: tempo = 1 * 60 * 60 * 1000;
            break;
        case 2: tempo = 2 * 60 * 60 * 1000;
            break;
        case 3: tempo = 5 * 60 * 60 * 1000;
            break;
        case 4: tempo = 5 * 60 * 60 * 1000;
            break;
    };
    acao.acao_termina_em = date.getTime() + tempo;

    var acaoJogo = this.actionJogo(acao);
    acaoJogo.save(function(err, newAction){
		if(err){
			return console.error(err);
        };
	});

    var moedas = null;
    switch(parseInt(acao.acao)){
        case 1: moedas = -2 * acao.quantidade;
            break;
        case 2: moedas = -3 * acao.quantidade;
            break;
        case 3: moedas = -1 * acao.quantidade;
            break;
        case 4: moedas = -1 * acao.quantidade;
            break;
    };

    var jogoDao = this._modelJogo;
    jogoDao.updateOne(
        {usuario: acao.usuario},
        {$inc: {moeda: moedas}},
        function(err, sucess){
            console.log(sucess);
        }
    );
};

AcaoDAO.prototype.getAcoes = function(usuario, res){
    var date  = new Date();
    var momento_atual = date.getTime();

    var acaoJogo = this.actionJogo;
    acaoJogo.find({ usuario: usuario, acao_termina_em: {$gt: momento_atual }}, function (err, docs){
        res.render('pergaminhos', {acoes : docs});
    });

};
AcaoDAO.prototype.revogarAcao = function(id, res){
    var acaoDAO = this.actionJogo;
    console.log(id);

    //Todas os dois métodos abaixos funcionam
    //acaoDAO.findByIdAndDelete(id, function (err, docs){
    acaoDAO.findOneAndDelete({_id: id}, function (err, docs){
        res.redirect('/jogo?msg=d');
    });
};

module.exports = function(){
    return AcaoDAO;
};
