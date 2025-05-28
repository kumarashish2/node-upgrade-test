const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Node.js 18 Sample Project',
    nodeVersion: process.version
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Node.js version: ${process.version}`);
}); 