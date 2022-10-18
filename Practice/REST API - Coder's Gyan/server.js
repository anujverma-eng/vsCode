import express from "express";
import mongoose from "mongoose";
import { APP_PORT, DB_URL } from "./config";
import errorHandler from "./middlewares/errorHandler";
import router from "./routes";
import path from 'path';

const app = express();

//Database Connection
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error: '));
db.once('open', () => {
    console.log("DB Connected Successfully...");
});

global.appRoot = path.resolve(__dirname);
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use('/api', router);



app.use(errorHandler);
app.listen(APP_PORT, () => { console.log(`Listening on Port ${APP_PORT}`); });