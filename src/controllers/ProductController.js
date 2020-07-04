const { Op } = require('sequelize');

const Products = require('../models/Products');
const connection = require('../../database/index');

module.exports = {
	async getAll(req, res) {
		const sections = [
			'alimentos',
			'bebidas',
			'casa-e-limpeza',
			'cuidados-com-a-roupa',
			'descartaveis',
			'higiene-e-beleza'
		];

		let my_query = '';
		sections.forEach((section, i) => {
			if (i === 0) {
				my_query =
					my_query +
					`(select id, product_name, price, image_url, section from products where section = '${section}' limit 5)`;
			} else {
				my_query =
					my_query +
					`union all (select id, product_name, price, image_url, section from products where section = '${section}' limit 5)`;
			}
		});
		const [ products ] = await connection.query(my_query);
		return res.json(products);
	},

	async getSearch(req, res) {
		const { value, page } = req.query;
		const limit = (page - 1) * 25;
		let my_query;

		if (page) {
			my_query = `select product_id, product_name, price, image_url from product WHERE product_name ~* '^(?=.*${value})' LIMIT 25 OFFSET ${limit}`;
		} else {
			my_query = `select product_id, product_name, price, image_url from product WHERE product_name ~* '^(?=.*${value})' LIMIT 5`;
		}

		const [ products ] = await connection.query(my_query);

		return res.json(products);
	},

	async getSection(req, res) {
		const query = req.query;
		const section = req.params.section;
		const limit = (query.page - 1) * 25;

		let my_query;

		if (Object.keys(query).length === 0 && query.constructor === Object) {
			my_query = 'SELECT product_id, product_name, price, image_url FROM product WHERE section = ? LIMIT 20';
		} else {
			my_query = `SELECT product_id, product_name, price, image_url FROM product WHERE section = ? LIMIT 25 OFFSET ${limit}`;
		}

		const [ products ] = await connection.query(my_query, { replacements: [ section ] });

		return res.json(products);
	}
};
