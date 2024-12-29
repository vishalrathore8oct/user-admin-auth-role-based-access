const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.config.js');
const authRoutes = require('./routes/auth.route.js');
const taskRoutes = require('./routes/task.route.js');

dotenv.config();

const app = express();

app.use(express.json());


const port = process.env.PORT || 3000;

app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);

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