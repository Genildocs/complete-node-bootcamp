const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const mongoose = require('mongoose');
const Tour = require('./../../models/tourModel');
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

//   Read JSON file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

//   Import data into DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Dados importados com sucesso!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//   Delete all data from DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Dados deletados com sucesso!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delet') {
  deleteData();
}
