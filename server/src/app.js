const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const db = require("./utils/db")
const multer = require("multer")
const cors = require("cors")
const Image = require("./model/image.model")
const User = require("./model/user.model")
const bcrypt = require("bcrypt")

const app = express()
const upload = multer({ storage: multer.memoryStorage() })

app.use(
    cors({
        origin: "https://roshan-kumar-dobby.netlify.app",
        credentials: true,
    })
)

app.use(express.json())

app.get("/healthcheck", (req, res) => {
    res.sendStatus(200)
})

// Create New User
app.post("/api/user", async (req, res) => {
    const { body } = req
    console.log(body)
    try {
        const user = await User.findOne({ email: body.email })

        if (user) return res.status(400).send("Email Already Exists")

        const hashedPassword = bcrypt.hashSync(body.password, 10)
        const newUser = User.insertMany({
            name: body.username,
            email: body.email,
            password: hashedPassword,
        })

        res.status(201).send(newUser)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Login
app.get("/api/user", async (req, res) => {
    try {
        const { query } = req
        const user = await User.findOne({ email: query.email })
        if (!user) return res.status(400).send("No User Found")
        isPassword = bcrypt.compareSync(query.password, user.password)
        if (isPassword) return res.status(200).send(user)
        return res.status(400).send("Invalid Credentials")
    } catch (e) {
        res.status(400).send(e)
    }
})

// Upload Image
app.post("/api/upload/:name", upload.single("image"), (req, res) => {
    if (!req.file) return res.status(404).send("No Image Found!")

    const image = new Image({
        name: req.params.name,
        data: req.file.buffer,
        contentType: req.file.mimetype,
        email: req.query.email,
    })

    image
        .save()
        .then((savedImg) => res.status(200).send(savedImg))
        .catch((e) => res.status(400).send(e))
})

// fetch Images

app.get("/api/upload/:email", async (req, res) => {
    try {
        const images = await Image.find({ email: req.params.email })
        res.send(images)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.listen(process.env.PORT || 3002, () => {
    console.log(`Server is running at ${3002}`)
    db()
})
