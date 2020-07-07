const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const app =  express();


cloudinary.config({ 
   cloud_name: 'zibbly', 
   api_key: '766114696781663', 
   api_secret: 'cMGDYZfr1hZS-hFXsOCKpO8YHUA' 
});

app.use(bodyParser.json({limit: '90mb', extended: true}));
app.use(cors())

app.get('/', (req, res)=>{ res.status(200) })

app.get('/getmainpageimages',(req,res)=>{
   cloudinary.search
  .expression('folder:oakfieldPhotography/mainPageGallery')
  .max_results(6)
  .execute()
  .then(result=>res.status(200).json(result));
})

app.post('/getgalleryimages',(req,res)=>{
   cloudinary.search
  .expression('folder:oakfieldPhotography/gallery/'+req.body.type)
  .max_results(30)
  .execute()
  .then(result=>{
      res.status(200).json(result);
   })
})

app.listen(process.env.PORT || 3000, ()=> {
   console.log("App running on port ${process.env.PORT}")
});
