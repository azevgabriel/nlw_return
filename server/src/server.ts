import cors from 'cors';

import express from 'express';
import myParser from 'body-parser';

import { routes } from './routes';

const app = express();

app.use(cors());

app.use(myParser.json({ limit: '200mb' }));
app.use(myParser.urlencoded({ limit: '200mb', extended: true }));
app.use(myParser.text({ limit: '200mb' }));

app.use(routes);

app.listen(process.env.PORT || 3333, () => {
  console.log('Server started on port 3333');
});
