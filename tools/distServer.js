import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 4000;

app.use(express.static(`${__dirname}/../public`));
app.use((req, res) => {
  return res.sendFile(path.resolve('public/index.html'));
});

app.listen(port);
