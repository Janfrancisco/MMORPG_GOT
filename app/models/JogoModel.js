var connection = function(){
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var conn = require('../../config/dbConnection');
    conn();
    var gameSchema = new Schema({
           usuario: String,
           moeda: Number,
           suditos: Number,
           temor: Number,
           sabedoria: Number,
           comercio: Number,
           magia: Number
    });
    return mongoose.models.jogo || mongoose.model("jogo", gameSchema);

};
module.exports = function(){
    return connection;
};
