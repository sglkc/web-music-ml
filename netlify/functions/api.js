import bodyParser from 'body-parser';
import serverless from 'serverless-http';
import express from 'express';

const api = express();
const router = express.Router();

router.get('/', (_, res) => res.send('hello'))

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(express.urlencoded({ extended: true }));
api.use('/api', router);
api.use((_, res) => res.sendStatus(404));

module.exports.handler = serverless(api);
