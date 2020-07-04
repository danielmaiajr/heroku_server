const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Customer = require('../models/Customer');

module.exports = {
	async create(req, res) {
		const { email, password, first_name, last_name, phone, cpf } = req.body;

		// Encriptar a senha
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		user = {
			email,
			pass_word: hash,
			first_name
		};

		const customer = await Customer.create(user);

		return res.json(customer);
	},

	async login(req, res) {
		const { email, password } = req.body;
		console.log(email, password);

		const customer = await Customer.findOne({ where: { email } });
		if (customer === null) return res.status(400).json({ login: 'Usuario ou senha incorreta' });

		bcrypt.compare(password, customer.pass_word, (err, result) => {
			if (!result) return res.status(400).json({ login: 'Usuario ou senha incorreta' });

			const payload = {
				id: customer.id,
				email: customer.email,
				name: customer.first_name
			};

			// Gerar o token para o usuario
			jwt.sign(payload, 'SECRET', { expiresIn: '7d' }, (err, token) => {
				if (err) console.log(err);
				//Enviar token
				return res.json({ success: true, token: 'Bearer ' + token });
			});
		});
	},

	async get(req, res) {
		return res.json(req.user);
	},

	async put(req, res) {
		const { body } = req;

		const customer = await Customer.update(body, {
			where: { id: req.user.id }
		});

		return res.json(customer);
	}
};
