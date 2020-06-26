const express = require('express');
const router = express.Router();

router.post('/products', (req, res) => {
	const { body } = req;
	const my_query = 'INSERT INTO product SET  ?';

	req.connection.query(my_query, [ body ], (error, results, fields) => {
		if (error) return res.json(error.sqlMessage);
		return res.json({ mensage: 'success' });
	});
});

router.get('/products', (req, res) => {
	const colunms = [ 'product_id', 'product_name', 'price', 'image_url' ];
	const my_query = 'SELECT product_id, product_name, price, image_url FROM product LIMIT 20';

	req.connection.query(my_query, (error, results) => {
		if (error) return res.status(500).json(error);
		return res.json(results.rows);
	});
});

//ROUTE: GET /products/alimentos?search=arroz&page=1

router.get('/products/:section', (req, res) => {
	const query = req.query;
	const section = req.params.section;
	let my_query;
	if (Object.keys(query).length === 0 && query.constructor === Object) {
		my_query = 'SELECT ?? FROM product WHERE section = ? LIMIT 20';
	} else {
		my_query =
			"SELECT ?? FROM product WHERE section = ? AND product_name REGEXP '(?=.*" + query.search + ")' LIMIT 5";
	}

	const colunms = [ 'product_id', 'product_name', 'price', 'image_url' ];

	req.connection.query(my_query, [ colunms, section ], (error, results, fields) => {
		if (error) return res.status(500).json(error.sqlMessage);
		return res.json(results);
	});
});

router.put('/products/:id', (req, res) => {
	const { id } = req.params;
	const { body } = req;
	const my_query = 'UPDATE product SET ? WHERE product_id = ?';

	req.connection.query(my_query, [ body, id ], (error, results, fields) => {
		if (error) return res.status(500).json(error.sqlMessage);
		return res.json(results);
	});
});

//THIS ROUTE CAN NOT BE USED BECAUSE OF CONSEQUENCES TO ANOTHER TABLE
router.delete('/products/:id', (req, res) => {
	const id = req.params.id;
	const my_query = 'DELETE FROM product WHERE product_id = ?';

	req.connection.query(my_query, [ id ], (error, results, fields) => {
		if (error) return res.status(500).json(error.sqlMessage);
		return res.json(results);
	});
});

module.exports = router;
