import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { LOGIN_RESPONSE_MOCK } from './mocks/login';
import { REGISTER_RESPONSE_MOCK } from './mocks/register';
import { COURSES_RESPONSE_MOCK } from './mocks/courses';

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/auth/login', (req: Request, res: Response) => {
  setTimeout(() => res.send(LOGIN_RESPONSE_MOCK), 1000);
});

app.post('/auth/register', (req: Request, res: Response) => {
  setTimeout(() => res.send(REGISTER_RESPONSE_MOCK), 1000);
});

app.get('/tutorial/*', (req: Request, res: Response) => {
  setTimeout(() => res.send(COURSES_RESPONSE_MOCK[0]), 1000);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
