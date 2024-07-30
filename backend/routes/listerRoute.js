const express = require('express')
const router = express.Router()

//  route-> lister/
const {createNewTurf, getTurfByLister}  = require('../controllers/listerController')


//add turf (post)
router.post('/turf/new',createNewTurf)

// update turf (add)
router.patch('/turf/update',()=>{})
//view account data (get)

router.get('/hasTurf',getTurfByLister)




const multer = require('multer')
const fs = require('fs')
const photosMiddleware = multer({dest:'uploads/'})
const uploadPhoto = (req,res) =>{
    const uploadedFiles = [];
    // res.json(req.files)
    // console.log(req.files)
    for(let i = 0; i<req.files.length;i++){
        const {path,originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length -1];
        const newPath = path + '.' + ext ; //path to be modified with listerID
        fs.renameSync(path,newPath)
        uploadedFiles.push(newPath.replace('uploads\\',''))

    }
    res.json(uploadedFiles)
}


router.post('/turf/uploadPhoto',photosMiddleware.array('photos',100),uploadPhoto)



module.exports = router