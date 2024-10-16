const mongoose = require('mongoose');
module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection failed');
    }
}