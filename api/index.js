const express=require ('express')
const cors = require('cors');
const app=express()
const mongoose = require('mongoose');
require('dotenv').config()
const User=require("./models/user.js")
const bcrypt = require('bcrypt');
const cookieParser =require('cookie-parser')
const bcryptSalt=bcrypt.genSaltSync(10)
const jwt = require('jsonwebtoken');
const imageDownloader =require('image-downloader');
const jwtSecret='ritik123'
const now = require("date-now")
const multer = require("multer")
const fs=require('fs')

app.use(cookieParser())
app.use(express.json());
app.use('/uploads', express.static(__dirname+'/uploads'))
const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig));

app.get('/api/test', (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    res.json('test ok');
  });

app.post('/register',async(req,res)=>{
    mongoose.connect(process.env.MONGO_URL)
    const {name,email,password}=req.body;
    
    try{
    const userDoc=await User.create({
        name,
        email,
        password:bcrypt.hashSync(password,bcryptSalt)
    })
    res.json(userDoc)
    }
    catch(e){
        res.status(422).json(e);

    }
})

app.post('/login',async(req,res)=>{
    mongoose.connect(process.env.MONGO_URL);
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign({ name :userDoc , _id:userDoc._id},jwtSecret,{},(err,token)=>{
          if(err)throw err;
          res.cookie("token",token).json(userDoc)
        });
        
      } else {
        res.status(422).json('pass not ok');
      }
    } else {
      res.json('not found');
    }
})
app.get('/profile',(req,res)=>{
  const {token}=req.cookies
  if(token){
    jwt.verify(token,jwtSecret,{},async(err,userData)=>{
      if(err)throw err;
      const {name ,email, _id}= await User.findById(userData._id);
      res.json({name ,email, _id})
    })
  }
  else{
    res.json({})
  }
})

app.post('/logout',(req,res)=>{
  res.cookie('token','').json(true)
})

console.log({__dirname})

app.post('/upload-by-Link',async (req,res)=>{
  const {link}=req.body
  const newName ='photo'+ Date.now() + '.jpg'
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' + newName,
  })
  res.json(newName)
})
const photoMiddleware=multer({dest:'uploads'})
app.post ('/upload',photoMiddleware.array('photos',100),(req,res)=>{
 const uploadedFiles =[]
  for(let i=0;i<req.files.length;i++){
  const {path,originalname}=req.files[i]
  const parts=originalname.split('.')
  const ext =parts[parts.length -1]
  const newPath = path + '.' + ext
  fs.renameSync(path,newPath)
  uploadedFiles.push(newPath.replace('uploads/',''))
 }
  res.json(uploadedFiles)
})
app.listen(3000)