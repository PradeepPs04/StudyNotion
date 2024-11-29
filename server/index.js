const express = require('express');
const app = express();

// import required configs
const {dbConnect} = require('./config/database');
const {cloudinaryConnect} = require('./config/cloudinary');

// import all routes
const userRoutes = require('./routes/User');
const profileRoutes = require('./routes/Profile');
// const paymentRoutes = require('./routes/Payments');
const courseRoutes = require('./routes/Course');

// import required middlewares
const cookieParser = require('cookie-parser');
const cors = require('cors'); // Cross-Origin Resource Sharing
const fileUpload = require('express-fileupload');

require('dotenv').config();
const PORT = process.env.PORT || 4000;

// database connect
dbConnect();

// cloudinary connect
cloudinaryConnect();

// use required middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: 'https://localhost:3000',
        credentials: true,
        // Without credentials: true, cookies (such as session cookies) or other credentials would not be sent in cross-origin requests.
    })
);

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp',
}));

// routes
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/course', courseRoutes);
// app.use('/api/v1/payment', paymentRoutes);

app.listen(PORT, () => {
    console.log(`App started at port: ${PORT}`);
});

app.get('/', (req, res) => {
    res.send(`<h1>Home page of backend</h1>`);
});