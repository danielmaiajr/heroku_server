const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const Customer = require('../src/models/Customer');

var opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: 'SECRET',
	passReqToCallback: true
};

module.exports = (passport) => {
	passport.use(
		new JwtStrategy(opts, async (req, jwt_payload, done) => {
			const customer = await Customer.findOne({ where: { id: jwt_payload.id } });

			if (customer === null) return done(null, false);

			return done(null, customer);
		})
	);
};
