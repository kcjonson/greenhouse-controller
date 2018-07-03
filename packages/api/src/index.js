import app from './server';

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Your app is running on port ${port}`); // eslint-disable-line
});
