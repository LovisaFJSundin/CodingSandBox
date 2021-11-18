const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const searchRoutes = require('./routes/search');

const app = express();

app.use(authRoutes);

// Register middleware
app.listen(5000);