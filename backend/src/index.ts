import express from 'express'
import cors from 'cors'
import { AddressInfo } from 'net';
import {routes} from './routes'
import dotenv from 'dotenv'

dotenv.config();

const app = express();

app.use(cors({origin: true}));

app.use(express.json());

app.use(routes);

const server = app.listen(3000, ()=>{
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});