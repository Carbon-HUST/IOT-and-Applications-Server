require('dotenv').config();
require('express-async-errors');
require('./mqtt/subscriber');

const express = require('express');
const connectDb = require('./config/db.config');

const userRouter = require('./routes/user.route');
const roomRouter = require('./routes/room.route');
const homeRouter = require('./routes/home.route');
const deviceRouter = require('./routes/device.route');
const deviceTypeRouter = require('./routes/devicetype.route');
const deviceDataRouter = require('./routes/devicedata.route');
const brokerRouter = require('./routes/broker.route');

const authenticationMiddleware = require('./middlewares/authentication');
const notFoundMiddleware = require('./middlewares/notfound.middleware');
const errorHandlerMiddleware = require('./middlewares/errorhandler.middleware');

const app = express();

app.use(express.json());

app.use('/api/auth', userRouter);
app.use('/api/room', authenticationMiddleware, roomRouter);
app.use('/api/home', authenticationMiddleware, homeRouter);
app.use('/api/device', authenticationMiddleware, deviceRouter);
app.use('/api/devicetype', deviceTypeRouter);
app.use('/api/broker', brokerRouter);
app.use('/api/data', authenticationMiddleware, deviceDataRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (err) {
        throw err;
    }
}

start();