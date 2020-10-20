const hp = require('../repositories/helpers');
const hpClass = require('./helpersClassificacao');

const obterRodadas = async (ctx) => {
	const rodadas = await hp.obterRodadas();

	ctx.body = {
		status: 'sucesso',
		dados: rodadas,
	};

	return;
};

const obterJogosRodada = async (ctx) => {
	const { id = null } = ctx.params;

	const rodada = await hp.obterJogosRodada(id);

	if (!id) {
		ctx.status = 400;
		ctx.body = { mensagem: 'Pedido mal formatado' };
	}

	if (id >= 39) {
		ctx.status = 400;
		ctx.body = { mensagem: 'Pedido mal formatado' };
	}

	if (rodada) {
		ctx.body = { status: 'sucesso', dados: rodada };
		return;
	}

	ctx.status = 404;
	ctx.body = { rodada: null };
};

const obterClassificao = async (ctx) => {
	let tabela = [];
	const rodadas = await hp.obterRodadas();

	hpClass.criarTabela(rodadas, tabela);
	hpClass.ordenarTabela(tabela);

	ctx.body = {
		status: 'sucesso',
		dados: tabela,
	};

	return;
};

const editarJogoRodada = async (ctx) => {
	const {
		id = null,
		gols_casa = null,
		gols_visitante = null,
	} = ctx.request.body;

	if (!id || !gols_casa || !gols_visitante) {
		ctx.status = 400;
		ctx.body = 'Error';
	}

	const rodadaModificada = await hp.editarJogoRodada(
		id,
		gols_casa,
		gols_visitante
	);

	ctx.body = {
		status: 'sucesso',
		dados: rodadaModificada,
	};

	return;
};

module.exports = {
	obterRodadas,
	obterJogosRodada,
	obterClassificao,
	editarJogoRodada,
};
