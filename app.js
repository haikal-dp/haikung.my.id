require('./setting');
const { express, session, path, bodyParser } = require('./module');
const { secret, logVisitor } = require('./database/lib/fungsi');
const app = express();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Menyimpan file yang diunggah ke folder 'uploads'
const favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname, 'database', 'gambar', 'fav.ico')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(secret);


app.use(logVisitor);
app.get('/', (req, res) => {
    res.render('index');
});

// Rute untuk mengunggah file
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File berhasil diunggah!');
});

// Middleware untuk menangani kesalahan 404
app.use((req, res, next) => {
    res.status(404).send('404'); // Merender halaman 404
});

// Middleware untuk menangani kesalahan 500
app.use((err, req, res, next) => {
    console.error(err.stack); // Mencetak stack error ke konsol
    res.status(500).send('500'); // Merender halaman 500
});

// Middleware untuk menangani kesalahan 403
app.use((err, req, res, next) => {
    console.error(err.stack); // Mencetak stack error ke konsol
    res.status(403).send('403'); // Merender halaman 403
});

app.listen(global.port, () => {
    console.log(`Server is running on http://localhost:${global.port}`);
});