import express, { Router } from 'express';
import path from 'path';
import bodyParser from 'body-parser';

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
  try {
    const { member } = req.body;
  } catch (e) {
    next(e);
  }
});

app.use(bodyParser.json());
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

app.listen(3000, () =>
  console.log('Server started at http://localhost:3000')
);
