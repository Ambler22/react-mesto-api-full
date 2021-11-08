const express = require('express');
const mongoose = require('mongoose');
const { errors, celebrate, Joi } = require('celebrate');
const validator = require('validator');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-error');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const {
  login,
  createUser,
} = require('./controllers/users');

const validation = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('Введена некорректная ссылка.');
};

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

/* const CORS_WHITELIST = [
  'http://localhost:3000',
  'https://dom.rom.nomoredomains.rocks',
  'http://dom.rom.nomoredomains.rocks',
];

 const corsOption = {
  credentials: true,
  optionsSuccessStatus: 204,
  origin: function checkCorsList(origin, callback) {
    if (CORS_WHITELIST.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOption)); */

const options = {
  origin: [
    'http://localhost:3000',
    'https://dom.rom.nomoredomains.rocks',
    'http://dom.rom.nomoredomains.rocks',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use('*', cors(options));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validation),
  }),
}), createUser);

app.use(auth);

app.use('/', userRouter);
app.use('/', cardRouter);

app.use(errorLogger);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Not Found'));
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'Произошла ошибка'
      : message,
  });
  next();
});

app.listen(PORT);
