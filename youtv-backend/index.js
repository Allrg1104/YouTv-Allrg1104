const express = require('express');
const fileUpload = require('express-fileupload');
const connectDB = require('./db/mongo');

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const expressjwt = require('express-jwt')
const {urlencoded, json} = require('express');
const router = require('./routes/signos.routes.js');
const cors = require('cors');
const multer = require('multer');
const dotenv = require('dotenv');

// Permitir solicitudes desde el frontend con opciones de CORS
const corsOptions = {
    origin: 'https://youtv-allrg1104-frontend.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Si necesitas enviar cookies
    optionsSuccessStatus: 200
  };

mongoose.connect('mongodb+srv://allrg1104:RRp4xn4bxtzh1EWS@allrg1104.xtqyw.mongodb.net/gana_como_loco?retryWrites=true&w=majority&appName=Allrg1104',{})

const port = process.env.PORT;
connectDB();
// connectAWS();
const app = express();
dotenv.config();
app.use(express.json())

 

app.use(urlencoded({extended: true}))


app.use(cors())
app.use('/v1/signos', router);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

  app.listen(port, ()=>{
    console.log('listening at port 4000');
})