const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');

require('dotenv').config()

//Express
const app = express()

//route

const productRouter = require('./Router/productRoute')
const orderRouter = require('./Router/orderRoute')

//configuration

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use(`/api/v1/product`, productRouter)
app.use(`/api/v1/order`, orderRouter)


const PORT = process.env.PORT || 5000

const connectDb = require('./db')

//---------Deployment-------//

app.use(express.static('public'))

app.get("/", (req, res) => {
    res.sendFile("index.html",{root:"public"})
})


// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, './client/build')));

//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "../client/build/index.html"))
//     })
// }

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URL)
        app.listen(PORT, () => {
            console.log(`server is listening on port http://localhost:${PORT}`);
        })
    } catch (err) {
        throw err
    }
}

start();

