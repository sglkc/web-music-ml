import bodyParser from 'body-parser';
import serverless from 'serverless-http';
import express from 'express';
import artists from './routes/artists';
import songs from './routes/songs';

const api = express();
const router = express.Router();

router.use('/artists', artists);
router.use('/songs', songs);

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use('/api', router);
api.use((_, res) => res.sendStatus(404));

export const handler = serverless(api);
