const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.config.js');
const userRoutes = require('./routes/user.route.js');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const port = process.env.PORT || 3000;

app.use('/api/users', userRoutes);


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