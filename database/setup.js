const mongoose = require('mongoose');
require('dotenv').config();


mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
}).on('error', (err) => {
    console.log(`Database error: ${err}`);
});


module.exports = db;