require('./setting');
const { express, session, path, bodyParser } = require('./module');
const { secret, logVisitor } = require('./database/lib/fungsi');
const multer = require('multer');
const favicon = require('serve-favicon');

const app = express();
// Middleware
app.use(favicon(path.join(__dirname, 'database', 'gambar', 'fav.ico')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(secret);
app.use(logVisitor);
// Konfigurasi multer untuk menyimpan file dengan ekstensi yang benar
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Menyimpan file di folder 'uploads'
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // Mendapatkan ekstensi dari nama file asli
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Membuat ID unik
        cb(null, uniqueSuffix + ext); // Menyimpan file dengan nama unik dan ekstensi yang benar
    }
});

const upload = multer({ storage: storage });

// Rute
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/upload', (req, res) => {
    res.render('upload')
});
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File berhasil diunggah!');
});

app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send(`${err.status || 500} Error`);
});

// Memulai server
app.listen(global.port, () => {
    console.log(`Server is running on http://localhost:${global.port}`);
});