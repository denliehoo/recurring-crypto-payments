import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express :)');
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
