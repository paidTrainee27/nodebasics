const fs = require('fs')

fs.readFile('demo.txt', 'utf-8', (err, text) => {
    if (err != null) {
        console.error(err)
        return
    }
    console.log("This is text from file \n", text)
})

console.log("hello world")