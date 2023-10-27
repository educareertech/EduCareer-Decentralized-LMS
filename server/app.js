import express from 'express';
let port = 5000;
const app = express();
import { Connection } from './database/connect.js';
Connection();
import router from './routes/router.js';

app.use(express.json())

app.use(router);

app.listen(port, ()=>{
    console.log("Server Connected on port", port);
})