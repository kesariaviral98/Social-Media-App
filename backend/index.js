const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { port, frontendUrl } = require('./config/appConfig');

const app = express();

app.use(cors({ origin: frontendUrl, credentials: true }));
app.use(bodyParser.json());

app.use('/api', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));

app.get('/health', (req, res) => {
    res.send("APP IS RUNNING");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
