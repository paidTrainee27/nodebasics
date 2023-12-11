const express = require("express")
const { router } = require("./routes")
const bodyParser = require('body-parser')

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
//Auth middleware
//Log middleware
app.use(router)

app.listen(port, () => {
    console.log("server started on 8080, press ctrl + c to terminate")
})
