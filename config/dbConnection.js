var mongoose = require('mongoose');
var mongoDB = mongoose.connect('mongodb://localhost/got', { useNewUrlParser: true });

var connMongoDB = function (){
    console.log('Entrou na conexão');
	return mongoDB;
};
module.exports = function(){
	return connMongoDB;
};
