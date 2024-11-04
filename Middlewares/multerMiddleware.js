const multer = require('multer')
//diskstorege method used to upload files using multer
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename :(req,file,callback)=>{
        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null,filename)
    }
})

const multerConfig = multer ({
    storage
})
module.exports = multerConfig