var express = require('express');
var router = express.Router();

const multer = require('multer');

const accessToken = require('../middleware/accessToken');
const {sequelize,User,Jobsite} = require('../models');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//profile
router.get('/profile',accessToken,async(req,res) =>{
    try{
      const user = await User.findOne({where:{id:req.user.user_id},attributes:{exclude:['password','forget_password']}});
      if(user) return res.json({status:true,data:{userdetails:user},message:'User details'});
    }catch(err){
      console.log(err)
      return res.json({status:false,messge:'Something is wrong.'});
    }
  });



  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/users/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
  var upload = multer({ storage: storage })
   
  //profile update
  router.post('/profile-update',accessToken,upload.single('image'),async(req,res) =>{
    const {fullname,email,phone} = req.body;
     console.log(req.file)
    try{
       const user = await User.findOne({where:{id:req.user.user_id}});
        user.image  = req.file.filename; 
        user.fullname = fullname;
        user.email = email;
        user.phone = phone;
        user.save();
        
        return res.json({status:true,message:'User details updated successfully.'});
  
     
    }catch(err){
      console.log(err)
      return res.json({status:false,messge:'Something is wrong.'});
    }
  });

  


  //add jobsite
router.post('/jobsite/add',accessToken,async(req,res) =>{
    const {jobsite_name,
        lat,
        long,
        assigned_project_manager,
        start_date,
        expected_completion_date} = req.body;

    try{
       const jobsite = await Jobsite.create({
        jobsite_name,
        lat,
        long,
        assigned_project_manager,
        start_date,
        expected_completion_date,
       });

      if(jobsite) return res.json({status:true,message:'Jobsite added successfully.'});
    }catch(err){
      console.log(err)
      return res.json({status:false,messge:'Something is wrong.'});
    }
  });


module.exports = router;
