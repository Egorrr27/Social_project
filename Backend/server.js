const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, '../Frontend')));
app.use('/Icons', express.static(path.join(__dirname, '../Icons')));

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
  console.log('Фронтенд использует localStorage – данные хранятся в браузере');
});