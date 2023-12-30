const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

mongoose.set('strictQuery', false);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then((con) => {
    console.log('Conexão com o banco de dados realizada com sucesso!');
  })
  .catch((err) => {
    console.log('Erro ao conectar com o banco de dados! ' + err);
  });

app.use(express.json());
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
