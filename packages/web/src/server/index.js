import path from 'path';
import express from 'express';
import paths from '../../paths';

const port = process.env.PORT || 3000;
const app = express();

app.use(paths.publicPath, express.static(path.join(__dirname, '../client')))
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.listen(port, () => {
  console.log(`Your app is running on port ${port}`);
});