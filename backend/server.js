const express = require('express')
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/uploads',express.static(__dirname+'/uploads')) // now we can get photos in uploads

//middleware - convert response to json
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
  }));
app.use(cookieParser())

//routes
const guestRoute = require('./routes/guestRoute')
app.use('/guest/',guestRoute)

const listerRoute = require('./routes/listerRoute')
app.use('/lister/',listerRoute)

const userRoute = require('./routes/userRoute')
app.use('/user/',userRoute)




mongoose.connect(process.env.MONGO_URI)
   .then(()=>{
        console.log('mongodb connected')
        app.listen(process.env.PORT,()=>{
            console.log("connected to mongoDB and listening on",process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error)
    })


