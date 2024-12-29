const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.config.js');
const authRoutes = require('./routes/auth.route.js');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


const port = process.env.PORT || 3000;

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
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