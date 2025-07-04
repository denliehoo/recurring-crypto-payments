require('dotenv').config();

import express, { type Request, type Response } from 'express';
import routes from './routes';
import { connectDb } from './models';
import cookieParser from 'cookie-parser';

const cors = require('cors');

const app = express();
app.use(cookieParser());
app.use(express.json());

// For cookies
app.use(
  cors({
    origin: [process.env.FRONT_END_URL, process.env.FRONT_END_CHECKOUT_URL],
    credentials: true,
  }),
);

app.use('/auth', routes.auth);
app.use('/dashboard', routes.dashboard);
app.use('/payout', routes.payout);
app.use('/vendors', routes.vendor);
app.use('/vendorclients', routes.vendorClient);
app.use('/payments', routes.payments);
app.use('/externalPage', routes.externalPage);

const port = process.env.PORT || 3030;

app.get('/', async (_req: Request, res: Response) => {
  res.send('RecurCrypt Server');
});

connectDb().then(async () => {
  // Uncomment to reseed database
  // reSeedDatabase()

  app.listen(port, () => {
    if (process.env.ENV === 'DEV') {
      const hostname = 'recurcrypt-api.denliehoo.localhost';

      console.log(`Server listening on http://${hostname}:${port}`);
    } else {
      console.log(`Server is up and listening on port ${port}`);
    }
  });
});
