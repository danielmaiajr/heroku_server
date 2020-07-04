const Addresses = require('../models/Addresses');

module.exports = {
	async post(req, res) {
		const { neightborhood, street, num, cep } = req.body;
		const data = {
			neightborhood,
			street,
			num,
			cep,
			customer_id: req.user.id
		};
		const address = await Addresses.create(data);
		return res.json(address);
	},

	async getAll(req, res) {
		const address = await Addresses.findAll({ where: { customer_id: req.user.id } });
		return res.json(address);
	},

	async getOne(req, res) {
		const id = req.params.id;
		const customer_id = req.user.id;
		const address = await Addresses.findAll({ where: { customer_id, id } });
		return res.json(address);
	},

	async put(req, res) {
		const id = req.params.id;
		const { body } = req;
		const customer_id = req.user.id;
		const address = await Addresses.update(body, { where: { customer_id, id } });
		return res.json(address);
	},

	async delete(req, res) {
		const id = req.params.id;
		const customer_id = req.user.id;
		const address = await Addresses.destroy({ where: { customer_id, id } });
		return res.json({ id_removed: id });
	}
};
