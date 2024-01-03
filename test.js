const express = require('express')
const app = express();

const helmet = require('helmet')
const cors = require('cors')

const connectDB = require('./db/connect')

const authenticateUser = require('./middleware/authentication')
app.use(express.json())
app.use(helmet())
app.use(cors);


app.get('/', (req, res) => {
  res.send("Bhai me to chal rha hun");
})
app.listen(3000, () => {

  console.log("listening on 3000");
})