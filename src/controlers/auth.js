const response = require('./response');
const Usuario = require('../repositories/helpers');
const PassWord = require('../utils/password');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const autenticar = async (ctx) => {
	const { email = null, password = null } = ctx.request.body;

	if (!email || !password) {
		return response(ctx, 400, { mensagem: 'Pedido mal formatado!' });
	}

	const usuarioEmail = await Usuario.obterAutorPorEmail(email);

	if (usuarioEmail) {
		const comparsion = await PassWord.check(password, usuarioEmail.senha);
		if (comparsion) {
			const token = await jwt.sign(
				{ email: usuarioEmail.email },
				// eslint-disable-next-line no-undef
				process.env.JWT_SECRET || 'cubos',
				{ expiresIn: '1h' }
			);
			return response(ctx, 200, { token });
		}
	}
	return response(ctx, 200, { mensagem: 'Email ou senha incorretos!' });
};

module.exports = { autenticar };
