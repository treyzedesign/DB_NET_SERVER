const Post = require('../model/Post')
const uuid = require('uuid')


//@desc post a file
//@route POST api/postFile
//access private - token must be provided
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

//@desc get all files
//@route GET api/getAllFiles
//access private - token must be provided
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

//@desc get User files
//@route GET api/getUserFile/:id
//access public 
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

//@desc get one file
//@route GET api/getAFile/:id
//access public 
const getAFile = async(req, res)=>{
    const file_Id = req.params.id
    try {
        if(file_Id == null || file_Id == undefined){
            res.status(400).json({
                message: 'bad request'   
            })
        }else{
            const query = await Post.findOne({file_Id: file_Id})
            res.status(200).json({
                message: query
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//@desc delete on file
//@route GET api/deleteFile
//access private - token must be provided
const deleteFile = async (req, res)=>{
    const fileId = req.params.id

    try {
        if(fileId == null || fileId == undefined){
            res.status(400).json({
                message: 'bad request'   
            })
        }else{
            const query = await Post.findOne({file_Id: fileId}).deleteOne()
            res.status(200).json({
                message: 'deleted file successfully'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
module.exports=  {
    postFile,
    getAllFiles,
    getUserFile,
    getAFile,
    deleteFile
}