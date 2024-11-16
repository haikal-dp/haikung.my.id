require('./setting');
const { express,session,bodyParser } = require('./module');
const app = express();

// Konfigurasi middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret-key', // Ganti dengan kunci rahasia Anda
    resave: false,
    saveUninitialized: true,
}));

// Halaman utama
app.get('/', (req, res) => {
    res.send(`
        <h1>Home</h1>
        <p>${req.session.username ? `Hello, ${req.session.username}` : 'You are not logged in.'}</p>
        <a href="/login">Login</a>
        <a href="/logout">Logout</a>
    `);
});

// Halaman login
app.get('/login', (req, res) => {
    res.send(`
        <h1>Login</h1>
        <form method="POST" action="/login">
            <input type="text" name="username" placeholder="Username" required />
            <button type="submit">Login</button>
        </form>
    `);
});

// Proses login
app.post('/login', (req, res) => {
    const { username } = req.body;

    // Simulasi validasi pengguna
    if (username) {
        req.session.username = username; // Simpan username dalam session
        return res.redirect('/');
    }
    res.redirect('/login');
});

// Proses logout
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/');
        }
        res.redirect('/');
    });
});

// Jalankan server
app.listen(global.port, () => {
    console.log(`Server is running on http://localhost:${global.port}`);
});