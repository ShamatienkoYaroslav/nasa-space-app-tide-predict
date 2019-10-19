require('dotenv').config()

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import { stations, extremes } from './router';

const port: string = process.env.PORT || '5000';

// Create a new express application instance
const app: express.Application = express();
app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

app.use('/stations', stations);
app.use('/extremes', extremes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});