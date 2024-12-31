const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.config.js');
const authRoutes = require('./routes/auth.route.js');
const taskRoutes = require('./routes/task.route.js');
const cookieParser = require('cookie-parser');


dotenv.config();

const app = express();

app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const port = process.env.PORT || 3000;

app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/login', (req, res) => {
    res.render('login');
});


connectDB()
.then(() => {
    console.log('MongoDB Running Successfully:');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
})
.catch((error) => {
    console.log(`MongoDB Running Error: ${error.message}`);
    process.exit(1);
})
