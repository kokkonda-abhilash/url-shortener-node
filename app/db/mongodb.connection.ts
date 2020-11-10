import { Logger } from '@overnightjs/logger';
import mongoose = require('mongoose');
export default () => {
    mongoose.connect('mongodb://localhost:27017/db_url', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => {
        Logger.Info('Database connected');
    }).catch(err => {
        Logger.Err('Error occured connecting to database');
        Logger.Err(err.message);
    });
}
