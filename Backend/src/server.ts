import express from 'express';
import { serverConfig } from './config';
import pingRouter from './routers/ping.router';
import v1Router from './routers/v1.router';
import { attachCorrelationIdMiddleware } from './middleware/correlation.middleware';
import { appErrorHandeler, genericErrorHandeler } from './middleware/error.middleware';


const app = express();

app.use(attachCorrelationIdMiddleware)
app.use("/api/v1" , v1Router) ; 
app.use(appErrorHandeler) ; 
app.use(genericErrorHandeler) ; 

app.use("/api/v1", v1Router) ;

app.listen(serverConfig.PORT , () => {
    console.log(`Server is running on port ${serverConfig.PORT}`) ;
})

