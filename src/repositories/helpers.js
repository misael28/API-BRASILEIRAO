const bd = require('../utils/database');

const obterRodadas = async () => {
	const query = {
		text: `SELECT * FROM jogos`,
	};

	const result = await bd.query(query);
	//console.log(result.rows)
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

const editarJogoRodada = async (id, gols_casa, gols_visitante) => {
	const query = {
		text: `UPDATE jogos
		SET gols_casa = $2, gols_visitante=$3 
		WHERE id=$1
		RETURNING *;`,
		values: [id, gols_casa, gols_visitante],
	};
	const result = await bd.query(query);
	return result.rows;
};

module.exports = { obterRodadas, obterJogosRodada, editarJogoRodada };
