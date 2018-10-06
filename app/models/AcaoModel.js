var connection = function(){
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var conn = require('../../config/dbConnection');
    conn();
    var actionSchema = new Schema({
           acao: Number,
           quantidade: Number,
           acao_termina_em: Number,
           usuario: String
    });
    return mongoose.models.acao || mongoose.model("acao", actionSchema);

};
module.exports = function(){
    return connection;
};
