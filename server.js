const express = require("express");
const cors = require('cors');

const app = express()
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors());

const { router } = require('./routes/usersRoutes');
app.use('/', router)

app.listen(port, () => console.log(`server running on port: ${port}`))