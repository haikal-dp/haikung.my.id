
const { express,session,path,bodyParser } = require('../../module');
const secret = session({
    secret: global.secretKey, // Ganti dengan kunci rahasia Anda
    resave: false,
    saveUninitialized: true,
})

const logVisitor = (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; // Mendapatkan alamat IP
    const url = req.originalUrl; // Mendapatkan URL yang diakses
    const method = req.method; // Mendapatkan metode HTTP (GET, POST, dll.)
    console.log(`Visitor IP: ${ip}, Method: ${method}, URL: ${url}`);
    next(); // Melanjutkan ke middleware atau rute berikutnya
};
module.exports = {
    secret,
    logVisitor
}