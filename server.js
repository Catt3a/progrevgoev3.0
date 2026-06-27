const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Раздаём статику (HTML страница)
app.use(express.static(path.join(__dirname, 'public')));

// Маршрут для скачивания файла

app.get('/download', (req, res) => {
  const file = path.join(__dirname, 'files', 'extensionn.crx'); // замени на свой файл
  res.download(file);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
