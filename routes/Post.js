const { Router } = require("express")
const { postFile , getAllFiles, getUserFile, deleteFile} = require('../controller/PostController')
const {AuthUser} = require("../middleware/Auth")
const PostRouter = Router()
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, "dbinet" + '-' + uniqueSuffix + file.originalname)
      }
})
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 24 //24mb
    },
    // fileFilter: (req, file, cb) => {
    //     if (file.mimetype.split('/')[1] == "png" || file.mimetype.split('/')[1] == "jpg" || file.mimetype.split('/')[1] == "jfif" || file.mimetype.split('/')[1] == "webp" ||file.mimetype.split('/')[1] == "jpeg" || file.mimetype.split('/')[1] == "pdf") {
    //       cb(null, true);
    //     } else {
    //       cb(null, false);
    //       return cb(new Error('Only .png, .jpg, .pdf and .jpeg format allowed!'));
    //     }
    //   }
});

PostRouter.post('/postFile', AuthUser, upload.any(), postFile)
PostRouter.get('/getAllFiles', AuthUser, getAllFiles)
PostRouter.get('/getUserFile/:id', getUserFile)
PostRouter.delete("/deleteFile/:id", AuthUser, deleteFile)

module.exports = PostRouter