var express = require('express')
var router = express.Router();
var Article = require('../models/Article');
var multer = require('multer');
var path = require('path')

// multer 
var uploadPath = path.join(__dirname , '../public/uploads')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
  ///////////////////////////////////

router.get('/', (req,res,next) => {
    var user = req.user;
    res.render('articleform.ejs',{user})
})

router.post('/addarticle',upload.single('imageFile'), (req,res,next) => {
    // console.log(req.body)
    var imageFile = ['jpg','jpeg','png'];
    var extName = req.file.filename.split('.').pop();
    if(imageFile.includes(extName)){
        req.body.imageFile = req.file.filename
    }
    Article.create(req.body, (err, addarticle) => {
        // console.log(err, addarticle)
        if(err) return next(err);
        res.redirect('/articles/all')
    })
})

router.get('/all', (req,res,next) => {
    Article.find({}, (err,allarticles) => {
        var user = req.user;
        if(err) return next(err);
        res.render('allarticles.ejs', {allarticles, user})
    })
})

router.get('/:id', (req,res,next) => {
    var id = req.params.id;
    Article.findById(id,(err,eacharticle) => {
        var user = req.user;
        if(err) return next(err);
        res.render('eacharticle.ejs', {eacharticle, user})
    })
})

module.exports = router;