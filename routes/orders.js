const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post('/orders', passport.authenticate('jwt', { session: false }), (req, res) => {
	let { body, connection } = req;
	body.customer_id = req.user.id;
	body.order_status_id = 6;
	const my_query = 'INSERT INTO `order` SET ?';

	connection.beginTransaction(function(err) {
		if (err) {
			return res.json(err);
		}
		connection.query(my_query, body, function(error, results, fields) {
			if (error) {
				return connection.rollback(function() {
					return res.json(error.sqlMessage);
				});
			}
			const new_query =
				'INSERT INTO order_item ' +
				'SELECT ? , ci.product_id, p.price , ci.quantity ' +
				'FROM cart_item ci INNER JOIN product p ' +
				'ON ci.product_id = p.product_id ' +
				'WHERE customer_id = ?;';

			connection.query(new_query, [ results.insertId, body.customer_id ], function(error, results, fields) {
				if (error) {
					return connection.rollback(function() {
						return res.json(error.sqlMessage);
					});
				}
				connection.commit(function(err) {
					if (err) {
						return connection.rollback(() => {
							return res.json(err);
						});
					}
					return res.json(results);
				});
			});
		});
	});
});

router.get('/orders', passport.authenticate('jwt', { session: false }), (req, res) => {
	const customer_id = req.user.id;
	const colunms = [
		'o.order_id',
		'pm.payment_name',
		'os.status_name',
		'a.cep',
		'a.neightborhood',
		'a.street',
		'a.num',
		'o.ship_date'
	];
	const my_query =
		'SELECT ?? FROM `order` o ' +
		'JOIN address a ON a.address_id = o.address_id ' +
		'JOIN payment_method pm ON pm.payment_method_id = o.payment_method_id ' +
		'JOIN order_status os ON os.order_status_id = o.order_status_id ' +
		'WHERE o.customer_id = ?';

	req.connection.query(my_query, [ colunms, customer_id ], (error, results, fields) => {
		if (error) return res.json(error.sqlMessage);
		return res.json(results);
	});
});

router.get('/orders/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	const order_id = req.params.id;
	const customer_id = req.user.id;
	const my_query =
		'select ? as customer_id, p.product_id, p.product_name, p.image_url, oi.price, oi.quantity, (oi.price*oi.quantity) as total from product p inner join order_item oi on p.product_id=oi.product_id and oi.order_id=? where p.product_id in (select product_id from order_item where order_id =(select order_id from `order` where order_id = ? and customer_id = ?));';

	req.connection.query(my_query, [ customer_id, order_id, order_id, customer_id ], (error, results, fields) => {
		if (error) return res.json(error.sqlMessage);
		return res.json(results);
	});
});

//ADMIN ONLY - DANGEROURS
/* router.put('/orders/:id', (req, res) => {
	const payment_method_id = req.params.id;
	const { body } = req;
	const my_query = 'UPDATE payment_method SET ? WHERE payment_method_id = ?';

	req.connection.query(my_query, [ body, payment_method_id ], (error, results, fields) => {
		if (error) return res.json(error.sqlMessage);
		return res.json(results);
	});
}); */

//IT´S DANGEROURS TO USE THIS !!!
/* router.delete('/orders/:id', (req, res) => {
	const payment_method_id = req.params.id;

	const my_query = 'DELETE FROM payment_method WHERE payment_method_id = ?';

	req.connection.query(my_query, [ payment_method_id ], (error, results, fields) => {
		if (error) return res.json(error.sqlMessage);
		return res.json(results);
	});
}); */

module.exports = router;

//PEDIDO RECEBIDO
//AGUARDANDO CONFIRMAÇÂO
//AGUARDANDO ENTREGA
//ENTREGUE

//CANCELADO
