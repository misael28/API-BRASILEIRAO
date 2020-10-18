const bd = require('../utils/database');

const obterRodadas = async () => {
	const query = {
		text: `SELECT * FROM jogos`,
	};

	const result = await bd.query(query);
	return result.rows;
};

const obterJogosRodada = async (rodada) => {
	const query = {
		text: `SELECT * FROM jogos WHERE rodada = $1`,
		values: [rodada],
	};

	const result = await bd.query(query);
	return result.rows;
};

module.exports = { obterRodadas, obterJogosRodada };
