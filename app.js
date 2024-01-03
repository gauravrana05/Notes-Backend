
const helmet = require('helmet')
const cors = require('cors')
const rateLimiter = require('express-rate-limit')

require('dotenv').config();
require('express-async-errors')

const express = require('express')
const app = express()

const connectDB = require('./db/connect')

const authenticateUser = require('./middleware/authentication')

const authRouter = require('./routes/auth')
const notesRouter = require('./routes/notes')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
  })
)


app.use(express.json())
app.use(helmet());
app.use(cors());

app.use((req, res, next) => {
  console.log('API called:', req.method, req.url);
  next();
});
app.get('/', (req, res) => {
  res.send('<h1>Notes API</h1><a href="/api-docs">Documentation</a>');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/notes', authenticateUser, notesRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`));

  } catch (error) {
    console.log(error);
  }
};

start();