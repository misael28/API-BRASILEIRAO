const Router = require('koa-router');
const hp = require('./controlers/helpers');
const router = new Router();

/**
 * Rotas definidas abaixo
 */

router.get('/rodadas', hp.obterRodadas);
router.get('/rodada/:id', hp.obterJogosRodada);

module.exports = router;
