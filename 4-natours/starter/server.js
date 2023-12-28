const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
