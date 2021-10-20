const router = require('express-promise-router')();
const imoveisController = require('../controllers/imovel.controller');

router.post('/criarusuario', imoveisController.criarUsuario);

router.get('/imoveis', imoveisController.listarTodosImoveis);

router.get('/corretores', imoveisController.listarTodosCorretores);

router.get('/clientes', imoveisController.listarTodosClientes);

router.get('/statusimoveis', imoveisController.listarTodosStatusImoveis);

router.post('/deletarimovel', imoveisController.deletarImovelPorId);

router.post('/criarAluguel', imoveisController.criarAluguel);

router.post('/alterarStatusImovel', imoveisController.alterarStatusImovel);

module.exports = router;
