const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { getUserWithCredentials } = require('../services/UserService');

passport.use(new LocalStrategy(
    function (username, password, done) {
        getUserWithCredentials(username).then((user) => {
            if (!user) {
                return done(true, { message: 'Incorrect user/password combination' });
            }
            if (password !== user.password) {
                return done(true, { message: 'Incorrect user/password combination' });
            }
            return done(false, user);
        });
    }
));


module.exports = passport;