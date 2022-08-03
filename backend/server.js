// Require express and body-parser
const express = require("express")
const bodyParser = require("body-parser")

// Initialize express
const app = express()

// define a port
const PORT = 8000

//tell express to use body-parser's JSON
app.use(bodyParser.json())

//consume the routes
const bankSync = require("./routes/bank-sync")
app.use("/bank", bankSync)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
