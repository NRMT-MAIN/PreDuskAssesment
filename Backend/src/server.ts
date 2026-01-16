import express from 'express';
import { serverConfig } from './config';
import pingRouter from './routers/ping.router';
import v1Router from './routers/v1.router';


const app = express();

app.use(express.json());
app.use()

app.use("/api/v1", v1Router) ;

app.listen(serverConfig.PORT , () => {
    console.log(`Server is running on port ${serverConfig.PORT}`) ;
})

