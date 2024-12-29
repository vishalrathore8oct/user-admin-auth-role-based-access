const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connectInstance = await mongoose.connect(`${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`)
        console.log(`MongoDB Connected Successfully:`);
        
    } catch (error) {
        console.log(`MongoDB Connected Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;