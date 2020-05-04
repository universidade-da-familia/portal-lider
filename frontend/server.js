// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const path = require('path');

const app = express();

const PORT = 5000;

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/build/index.html`));
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server Started on Port ', PORT);
});
