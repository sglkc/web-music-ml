import bodyParser from 'body-parser';
import serverless from 'serverless-http';
import express from 'express';
import router from './routes';

const api = express();

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(express.urlencoded({ extended: true }));
api.use('/api', router);
api.use((_, res) => res.sendStatus(404));

export const handler = serverless(api);
