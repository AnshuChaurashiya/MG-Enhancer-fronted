const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const DBUrl = require("./Database/DbConnect");
const UserRouter = require('./routes/usersRouter')


dotenv.config();
DBUrl();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());
 


app.get("/", (req, res) => {
  res.send("Hello World");
});


app.use('/user', UserRouter )


module.exports = app;
