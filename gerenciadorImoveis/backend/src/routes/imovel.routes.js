const router = require('express-promise-router')();
const imoveisController = require('../controllers/imovel.controller');
const usuarioController = require('../controllers/usuario.controller');

router.get('/imoveis', imoveisController.listarTodosImoveis);

router.get('/corretores', imoveisController.listarTodosCorretores);

router.get('/clientes', imoveisController.listarTodosClientes);

router.get('/statusimoveis', imoveisController.listarTodosStatusImoveis);

router.post('/deletarimovel', imoveisController.deletarImovelPorId);

router.post('/criarAluguel', imoveisController.criarAluguel);

router.post('/alterarStatusImovel', imoveisController.alterarStatusImovel);

router.post('/login', usuarioController.login);

router.post('/criarusuario', usuarioController.criarUsuario);

module.exports = router;
