const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    file_Id :{
        type: String
    },
    userId :{
        type: String
    },
    title:{
        type: String
    },
    file : [
        {
            url: {type: String},
            filename: {type: String},
            size: {type: String}
        }
    ],
    date: {
        type: Date,
        default: new Date()
    }
})
const Post = mongoose.model('Post', postSchema)
module.exports = Post