const mongoose = require("mongoose")

const ImageSchema = new mongoose.Schema({
    name: String,
    data: Buffer,
    contentType: String,
    email: String,
})

module.exports = mongoose.model("ImageSchema", ImageSchema)
