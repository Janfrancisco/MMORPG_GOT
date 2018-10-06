var connection = function(){
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var conn = require('../../config/dbConnection');
    conn();
    var usersSchema = new Schema({
           nome: String,
           usuario: String,
           senha: String,
           casa: String,
    });
    return mongoose.models.usuarios || mongoose.model("usuarios", usersSchema);

};
module.exports = function(){
    return connection;
};
