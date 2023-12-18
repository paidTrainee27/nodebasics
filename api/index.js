const express = require("express")
const { router } = require("./routes")
const bodyParser = require('body-parser')
const { MongoDB } = require('../repository/db/mongo')

const port = process.env.PORT || 8080;

const app = express()
//Middlewares
app.use(express.json())
// app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);
//DI
MongoDB.connect().then(() => {
    console.log("Mongo db connected successfully")
}).catch((err) => {
    console.log("Mongo db connection ", err)
})
//Auth middleware
//Log middleware
app.use(router)

app.listen(port, () => {
    console.log("server started on 8080, press ctrl + c to terminate")
})
