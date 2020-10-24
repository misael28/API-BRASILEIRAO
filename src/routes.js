const Router = require('koa-router');
const router = new Router();
const Jogos = require('./controlers/helpers');
const Auth = require('./controlers/auth');
const Session = require("./middlewares/session")

/**
 * Rotas definidas abaixo
 */
router.post('/auth', Auth.autenticar);

router.get('/rodadas', Jogos.obterRodadas);
router.get('/jogos/:rodada', Jogos.obterJogosRodada);

router.get('/classificacao', Jogos.obterClassificao);

router.put('/jogos',Session.verify, Jogos.editarJogoRodada);

module.exports = router;
