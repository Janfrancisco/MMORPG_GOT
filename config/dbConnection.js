var mongoose = require('mongoose');
var mongoDB = mongoose.connect('mongodb://localhost/got', { useNewUrlParser: true });

var connMongoDB = function (){
	return mongoDB;
};
module.exports = function(){
	return connMongoDB;
    console.log('Conexão');
};
