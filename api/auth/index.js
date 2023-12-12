const express = require('express')

const router = express.Router()

const app = express()

app.use(router)

let sessionId = Math.floor(Math.random() * 1000)

const loginAuth = (req, res, next) => {
    const userID = req.get('userid')
    const pass = req.get('secret')
    if (userID != 'admin' || pass != 'admin') {
        res.status(203).send('Unauthorized')
        return
    }
    next()
}
const auth = (req, res, next) => {
    const sessId = req.get('sessionid')
    if (sessId != sessionId) {
        res.status(203).send('sessionExpired')
        return
    }
    next()
}


router.get("/", loginAuth, (_req, res) => {
    //expire sessionid and assign new one
    res.status(200).json({ sessionid: sessionId })
})
router.get("/dashboard", auth, (_req, res) => {
    res.status(200).send('helloo user')
})

app.listen("8000", () => {
    console.log("server started on 8080, press ctrl + c to terminate")
}
)
