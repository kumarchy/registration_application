const mongoose = require('mongoose');
const ConnectDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/Registration').then(()=> console.log("DB Connected"))
};

module.exports = ConnectDB;
