const express = require('express');
const apiRoutes = require('./routes/apiRoutes/index.js');
const initialInquire = require('./index.js');
const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', apiRoutes);

app.use((req, res) => {
  res.status(404).end();
});

const server = app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});

initialInquire.initialInquire(server);
