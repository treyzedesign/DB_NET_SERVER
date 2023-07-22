const Post = require('../model/Post')
const uuid = require('uuid')

const postFile = async(req,res)=>{
    console.log(req.files);
    try {
        const file = Array(...req.files).map((item)=>{
            return {
                url: item.path,
                filename: item.originalname,
                size: item.size
            }
        })
        console.log(file);
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
            message: error.message,
            data: "wshah"
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
    const userId = req.params.id
    try {
        if(userId == null || userId == undefined){
            res.status(400).json({
                message: 'bad request'   
            })
        }else{
            const query = await Post.find({userId: userId})
            if(query){
                res.status(200).json({
                    message: query  
                })
            }else{
                res.status(404).json({
                    message: 'not found'   
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteFile = async(req, res)=>{

}
module.exports=  {
    postFile,
    getAllFiles,
    getUserFile,
    deleteFile
}