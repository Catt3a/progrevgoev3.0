const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'public')));


app.get('/download', (req, res) => {
  const file = path.join(__dirname, 'public', 'extensionn.zip'); // замени на свой файл
  res.download(file);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
