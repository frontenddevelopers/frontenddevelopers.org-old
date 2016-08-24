import express, { Router } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { getUserByEmail, createUser } from './db';
import { fetchInvite, fetchSlackLogging } from './slack';
import settings from '../settings';

const app = express();
const router = new Router();

router.get('/', async (req, res, next) => {
  try {
    res.sendFile(path.resolve('./app/src/index.html'));
  } catch (e) {
    next(e);
  }
});

router.get('/humans.txt', (req, res) => {
  res.sendFile(path.resolve('./app/src/humans.txt'));
});

router.post('/signup', async (req, res, next) => {
  const validationError = (statusCode, message = '') => {
    const err = new Error(message);
    err.statusCode = statusCode;
    return err;
  };

  try {
    const { user } = req.body;
    const { email } = user;

    // basic validation
    if (!email.length || email.length < 5) throw validationError(400, 'Valid email required');

    // check if email is already used
    const duplicate = await getUserByEmail(email);
    if (duplicate) {
      throw validationError(400, 'User already exists');
    }

    await fetchInvite(user);
    await createUser(user);
    await fetchSlackLogging(user);

    res.redirect('/');
  } catch (e) {
    next(e);
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve('..', 'client', 'dist')));
app.use('/', router);
app.use((err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .send({
      ok: false,
      error: err.message || {},
    });
  next(err);
});

const { server: { host, port } } = settings;
app.listen(port, host, () =>
  console.log(`Server started at http://${host}:${port}`)
);
