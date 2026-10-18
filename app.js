const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./Config/databaseConfig');
const app = express();

// has to be in this order because we need to load the environment variables before using them
dotenv.config(); //load enviroment variables from .env files

app.use(express.json()); //middleware to parse JSON request bodies

const productRoute = require('./Routes/ProductRoute');
const userRoute = require('./Routes/UserRoute')

//use the product route for all requests starting with /products
app.use('/products', productRoute);

//use the user route for all requests starting with /users
app.use('/users', userRoute);

connectDB(); //connect to MongoDB

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})