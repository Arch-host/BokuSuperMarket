const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./Config/databaseConfig');
const app = express();

const productRoute = require('./Routes/ProductRoute');
const userRoute = require('./Routes/UserRoute')

dotenv.config(); //load enviroment variables from .env files
connectDB(); //connect to MongoDB

//middleware to parse JSON request bodies
app.use(express.json());

//use the product route for all requests starting with /products
app.use('/products', productRoute);

//use the user route for all requests starting with /users
app.use('/users', userRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})