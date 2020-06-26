const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

//THIS ROUTE NEED
//CHECK USER INPUT - MAYBE CHECK WITH A VALIDATION MIDDLEWARE
//ERROR CHECKING - MAYBE A CENTRAL MIDDLEWARE
//AUTH METHOD:
//JWT WITH LOCAL STORAGE, NEED PROTECTION FOR JS CLIENT SIDE
//SESSIONS WITH COOKIES, NEED PROTECTION FOR CSRF

//THIS ROUTE IS USING JWT WITH LOCAL STORAGE WITH PASSPORTJS

router.post('/customers', (req, res) => {
	const { email, password, first_name, last_name, phone, cpf } = req.body;
	let my_query = 'SELECT email FROM customer WHERE email = ?';

	req.connection.query(my_query, [ email ], async (error, results, fields) => {
		if (error) return res.json(error.sqlMessage);
		if (results.length > 0) return res.send(400).json({ register: 'Email já cadastrado' });

		// Encriptar a senha
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		user = {
			email,
			pass_word: hash,
			first_name
		};

		my_query = 'INSERT INTO customer SET ?';
		req.connection.query(my_query, [ user ], (error, results, fields) => {
			if (error) return console.log(error);
			return res.json({ message: 'success' });
		});
	});
});

//-------------------------------------------------------------------------------------------------------------

router.post('/customers/login', (req, res) => {
	const { email, password } = req.body;

	let my_query = 'SELECT customer_id, email, pass_word, first_name FROM customer WHERE email = ?';
	req.connection.query(my_query, [ email ], (error, results, fields) => {
		if (error) return res.json(error.sqlMessage);
		if (results.length == 0) return res.status(400).json({ login: 'Usuario ou senha incorreta' });

		const { customer_id, email, pass_word, first_name } = results[0];
		bcrypt.compare(password, pass_word, (err, result) => {
			if (!result) return res.status(400).json({ login: 'Usuario ou senha incorreta' });

			const payload = {
				id: customer_id,
				email: email,
				name: first_name
			};

			// Gerar o token para o usuario
			jwt.sign(payload, 'SECRET', { expiresIn: '7d' }, (err, token) => {
				if (err) console.log(err);
				//Enviar token
				return res.json({ success: true, token: 'Bearer ' + token });
			});
		});
	});
});

//-----------------------------------------------------------------------------------------------------------------

router.get('/customers', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { id } = req.user;
	const my_query = 'SELECT first_name, last_name, email, phone, cpf FROM customer WHERE customer_id = ?';

	req.connection.query(my_query, [ id ], (error, results, fields) => {
		if (error) return res.json(error.sqlMessage);
		return res.json(results);
	});
});

router.put('/customers', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { id } = req.user;
	const { body } = req;

	const my_query = 'UPDATE customer SET ? WHERE customer_id = ?';
	req.connection.query(my_query, [ body, id ], (error, results, fields) => {
		if (error) return res.status(400).json(error.sqlMessage);
		return res.json(results);
	});
});

//THIS ROUTE CAN NOT BE USED BECAUSE OF CONSEQUENCES TO ANOTHER TABLE
/* router.delete('/customers/:id', (req, res) => {
	const id = req.params.id;
	const my_query = 'DELETE FROM customer WHERE customer_id = ?';

	req.connection.query(my_query, [ id ], (error, results, fields) => {
		if (error) return res.json(error.sqlMessage);
		return res.json(results);
	});
}); */

module.exports = router;
