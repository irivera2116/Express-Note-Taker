// Links
const express = require('express');
const apiRoute = require('./route/api');
const htmlRoute = require('./route/html');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));
app.use(htmlRoute);
app.use(apiRoute);

app.listen(PORT, () => {
    console.log(`Running on localhost:${PORT}`);
})
