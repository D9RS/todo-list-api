module.exports = {
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    name: 'sid',
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 6,
    },
};
