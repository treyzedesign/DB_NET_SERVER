const Post = require('../model/Post')
const uuid = require('uuid')

const postFile = async(req,res)=>{
    console.log(req.files);
    try {
        const file = req.files.map((item)=>{
            return {
                url: item.path,
                filename: item.originalname,
                size: item.size
            }
        })
        // console.log(file);
        const newPost = {
            file_Id: uuid.v4(),
            userId : req.user.id,
            title: req.body.title,
            file: file
        }
        const query = await Post.create(newPost)
        if(query){
            res.status(200).json({
                message: "successfully posted",
                data: query
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
  
}

const getAllFiles = async(req, res)=>{
    try {
        const query = await Post.find()
        if(query.length < 1){
            res.status(404).json({
                message: 'No posts'
            })
        }
        res.status(200).json({
            data: query
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getUserFile = async(req, res)=>{
    try {
        const userId = req.user.id
        console.log(userId);
        const query = await Post.find({userId: userId})
        if(query < 1){
            res.status(404).json({
                message: 'You have no files'
            })
        }
        res.status(200).json({
            data: query
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
module.exports=  {
    postFile,
    getAllFiles,
    getUserFile
}