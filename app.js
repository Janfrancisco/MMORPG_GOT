
/* importar as configurações do servidor */
var app = require('./config/server');

var app_models = require('./app/controllers/teste');
/* parametrizar a porta de escuta */
app.listen(80, function(){
	console.log('Servidor online');
})

