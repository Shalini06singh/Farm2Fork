// import core modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path')

// import files

// app instance
const app = express();

// static files
app.use(express.static(path.join(__dirname, 'public')))

// middlewares
app.use(express.json())
app.use(cors())

// database
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
        .then(() => {
            console.log("database connection established");
        })
        .catch(err => {
            console.log(err);
        })


// routes
const adminRoutes = require("./routes/backend/root.route");
app.use('/admin' , adminRoutes)

const frontRoutes = require("./routes/frontend/root.route");
app.use('/api',frontRoutes)

// react routes
app.use(express.static(path.join(__dirname, './build')));

// port
const PORT = process.env.PORT || 8000;

// server listen
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
})