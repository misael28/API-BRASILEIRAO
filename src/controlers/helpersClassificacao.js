const calcularTabela = (nome, pontos, golsFeitos, golsSofridos,tabela) => {
	const timeExiste = tabela.find((time) => time.nome === nome);
	if (timeExiste) {
		//atualiza times
			(timeExiste.pontos += pontos),
			timeExiste.jogos++,
			(timeExiste.vitorias += pontos === 3 ? 1 : 0),
			(timeExiste.derrotas += pontos === 0 ? 1 : 0),
			(timeExiste.empates += pontos === 1 ? 1 : 0),
			(timeExiste.golsFeitos += golsFeitos),
			(timeExiste.golsSofridos += golsSofridos),
			(timeExiste.saldoGols += golsFeitos - golsSofridos);
	} else {
		//insere time
		tabela.push({
			nome,
			pontos,
			jogos:1,
			vitorias: pontos === 3 ? 1 : 0,
			derrotas: pontos === 0 ? 1 : 0,
			empates: pontos === 1 ? 1 : 0,
			golsFeitos,
			golsSofridos,
			saldoGols: golsFeitos - golsSofridos,
		});
	}
	return;
};

const criarTabela = (jogos,tabela) => {
	for (let jogo of jogos) {
		if (jogo.gols_casa === jogo.gols_visitante) {
			//empate
			calcularTabela(
				jogo.time_casa,
				1,
				jogo.gols_casa,
				jogo.gols_visitante,
				tabela
			);
			calcularTabela(
				jogo.time_visitante,
				1,
				jogo.gols_visitante,
				jogo.gols_casa,
				tabela
			);
		} else if (jogo.gols_casa > jogo.gols_visitante) {
			//time da casa venceu
			calcularTabela(
				jogo.time_casa,
				3,
				jogo.gols_casa,
				jogo.gols_visitante,
				tabela
			);
			calcularTabela(
				jogo.time_visitante,
				0,
				jogo.gols_visitante,
				jogo.gols_casa,
				tabela
			);
		} else {
			//time visitante venceu
			calcularTabela(
				jogo.time_casa,
				0,
				jogo.gols_casa,
				jogo.gols_visitante,
				tabela
			);
			calcularTabela(
				jogo.time_visitante,
				3,
				jogo.gols_casa,
				jogo.gols_casa,
				tabela
			);
		}
	}

	return;
};

const ordenarTabela = (times) => {
	const timesOrdenados = times.sort((timeA, timeB) => {
		if (timeB.pontos > timeA.pontos) return 1;
		if (timeA.pontos > timeB.pontos) return -1;
		if (timeB.vitorias > timeA.vitorias) return 1;
		if (timeA.vitorias > timeB.vitorias) return -1;
		if (timeB.saldo > timeA.saldo) return 1;
		if (timeA.saldo > timeB.saldo) return -1;
		if (timeB.golsFeitos > timeA.golsFeitos) return 1;
		if (timeA.golsFeitos > timeB.golsFeitos) return -1;
		return times.sort((a, b) => a.nome.localeCompare(b.nome));
	});
	return timesOrdenados;
};

module.exports = {calcularTabela,criarTabela,ordenarTabela}