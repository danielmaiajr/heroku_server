module.exports = (pool) => (req, res, next) => {
	pool.connect((err, client, release) => {
		//if (err) return next(err);

		if (err) return res.sendStatus(500);

		// adicionou a conexão na requisição
		req.connection = client;

		// passa a requisição o próximo middleware
		next();

		// devolve a conexão para o pool no final da resposta
		res.on('finish', () => {
			req.connection.release();
		});
	});
};
