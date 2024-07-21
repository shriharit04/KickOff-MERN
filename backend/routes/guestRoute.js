const express = require('express')
const router = express.Router()
const {viewTurfs,viewTurf, viewTurfSortedBy} = require('../controllers/guestController')
// on - /guest/
//get all available turfs
router.get('/view/turfs' , viewTurfs)

//get all available turfs by sort
router.get('/view/turfs/:sortBy', viewTurfSortedBy)

//get more info on selected turf
router.get('/view/turf/:id', viewTurf)








module.exports = router