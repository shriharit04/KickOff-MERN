const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Turf = require('../models/turfModel')


//  route-> lister/
const {createNewTurf, getTurfByLister}  = require('../controllers/listerController')


//add turf (post)
router.post('/turf/new',createNewTurf)



router.put('/turf/update/:id', async (req, res) => {    
    const { id } = req.params;
    // console.log(id)
    const updateData = req.body;
    // console.log(updateData)
    try {
      const updatedTurf = await Turf.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    //   console.log(updatedTurf)
      if (!updatedTurf) {
        return res.status(404).send('Turf not found');
      }
      res.send(updatedTurf);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });


  


router.get('/hasTurf',getTurfByLister)
// router.get('getListerContact/:id', async (req,res)=>{
//   const {id} = req.params      
//   const {email,phone} = await User.findById(id)
//         res.json({email,phone})
//     }
// )




const multer = require('multer')
const fs = require('fs')
const path = require('path');

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


const deletePhoto =  (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '..', 'uploads', filename);
    // const filePath = path.join(__dirname, 'uploads', filename); // Adjust the path as needed
    console.log(filePath)
  
    fs.unlink(filePath, (err) => {
      if (err) {
        if (err.code === 'ENOENT') {
          // File not found
          return res.status(404).send('File not found');
        }
        // Other errors, e.g. maybe we don't have enough permission
        return res.status(500).send('Error deleting the file');
      }
      res.send('File deleted');
    });
}


router.post('/turf/uploadPhoto',photosMiddleware.array('photos',100),uploadPhoto)
router.delete('/turf/deletePhoto/:filename',deletePhoto)



module.exports = router