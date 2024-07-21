const express = require('express')
const router = express.Router()

//  route-> lister/
const {createNewTurf}  = require('../controllers/listerController')


//add turf (post)
router.post('/turf/new',createNewTurf)

// update turf (add)
router.patch('/turf/update',()=>{})
//view account data (get)
router.get('/',()=>{})




const multer = require('multer')
const photosMiddleware = multer({dest:'uploads/'})
const uploadPhoto = (req,res) =>{
    res.json(req.photos)
    console.log(req.photos)

}


router.post('/turf/uploadPhoto',photosMiddleware.array('photos',100),uploadPhoto)



module.exports = router