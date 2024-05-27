import express from 'express';
import { dbConnection } from './DB/connection.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import userRouter from './src/Modules/User/user.routes.js';
import postRouter from './src/Modules/Post/post.routes.js';
import commentRouter from './src/Modules/Comment/comment.routes.js';

const PORT = process.env.PORT || 3000;

dotenv.config({ path: 'config.env' });
const app = express();

app.use(express.json());
app.use(morgan('dev'));

// Database conncation 
dbConnection();

app.get('/', (req, res) => { res.send('Simple Facebook API') });

// Router MW
app.use('/api/v1/user', userRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/comment', commentRouter);
// not found router
app.use('*', (req, res, next) => {
    const err = new Error(`can't find this route: ${req.originalUrl}`)
    next(err.message)
});

// global error handler middleware
app.use((err, req, res, next) => {
    res.status(400).json({ error: err });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
