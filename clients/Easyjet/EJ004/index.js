const cors = require('cors');
const express = require('express');
const app = express();

var corsOptions = {
    origin: "https://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ["Content-Type"]
};

app.use(cors(corsOptions));

app.listen(80, function () {
    console.log('CORS-enabled web server listening on port 80')
})
