const express = require("express")

const app = express()

app.listen(8080, () => {
    console.log("server started on 8080, press ctrl + c to terminate")
})