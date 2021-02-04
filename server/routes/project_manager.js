const { hash } = require('bcryptjs');
var express = require('express');
var bcrypt = require('bcryptjs');
var router = express.Router();

const saltRounds = 10;
const multer = require('multer');
const { route } = require('.');

const accessToken = require('../middleware/accessToken');
const {sequelize,User,Jobsite} = require('../models');




//get jobsite list
router.get('/list',accessToken,async(req,res) =>{
    try{
      const projectmanagers = await User.findAll(
          {
              where:{created_by:req.user.user_id,status:1,is_deleted:0},
              attributes:{exclude:['email','password','created_by','forget_password','createdAt','updatedAt']}
            });
      
      return res.json({status:true,data:{projectmanagers:projectmanagers},message:'projectmanagers list.'});
    }catch(err){
      console.log(err)
      return res.json({status:false,messge:'Something is wrong.'});
    }
});





//user project manager

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/users/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })
 
// var upload = multer({ storage: storage })
 

router.post('/add',accessToken,async(req, res)=>{

  const { fullname,username,email,phone,password } = req.body;
  
  if(!fullname) throw res.json({'status':false,"message":"Fullname is required"});
  if(!username) throw res.json({'status':false,"message":"Username is required"});
  if(!email) throw res.json({'status':false,"message":"Email is required"});
  if(!phone) throw res.json({'status':false,"message":"Phone number is required"});
  if(!password) throw res.json({'status':false,"message":"Password  is required"});

  console.log(req.user.user_id)
  
	try{
    const checkEmail    =  await User.findOne({where:{email:email,type:2,is_deleted:0}});
    if(checkEmail) return res.json({status:false,message:'Email already exist'});

    // const checkPhone    =  await User.findOne({where:{phone:phone,type:2,is_deleted:0}});
    // if(checkPhone) return res.json({status:false,message:'Phone already exist'});

    const checkUsername =  await User.findOne({where:{username:username,type:2,is_deleted:0}});
    if(checkUsername) return res.json({status:false,message:'Username already exist'});
  
    
    const hash = bcrypt.hashSync(password, saltRounds);
    const user = await User.create({
      fullname:fullname,
      username:username,
      email:email,
      phone:phone,
      created_by_by:req.user.user_id,
      password:hash,
      type:2
      });
    // const token = jwt.sign({user_id:user.id},'sssshhhhh');
    // return res.json(user)

		return res.json({'status':true,'message':"Project manager registered successfully."})
	}catch(err){
	    console.log(err)
		return res.json({'status':false,"message":"Something is wrong please try again later"}); 
	}
});



 
  //edit project manager 
router.post('/edit',accessToken,async(req,res) =>{
    const {id} = req.body;
    if(!id) return res.json({status:false,message:'id is required.'});
    try{
      const projectmanagers = await User.findOne(
          {
              where:{id:id,created_by:req.user.user_id,type:2,status:1,is_deleted:0},
              attributes:{exclude:['password']}
            });
       if(!projectmanagers) return res.json({status:false,message:'data not found according to this id.'});
      return res.json({status:true,data:{projectmanagers:projectmanagers},message:'projectmanager list.'});
    }catch(err){
      console.log(err)
      return res.json({status:false,messge:'Something is wrong.'});
    }
});


//update project manager
router.post('/update',accessToken,async(req, res)=>{

  const { fullname,email,phone,manager_id } = req.body;
  
  if(!fullname) throw res.json({'status':false,"message":"Fullname is required"});
   if(!id) throw res.json({'status':false,"message":"id is required"});
  if(!email) throw res.json({'status':false,"message":"Email is required"});
  if(!phone) throw res.json({'status':false,"message":"Phone number is required"});
  // if(!password) throw res.json({'status':false,"message":"Password  is required"});

  console.log(req.user.user_id)
  
	try{
    // const checkEmail    =  await User.findOne({where:{email:email,type:2,is_deleted:0}});
    // if(checkEmail) return res.json({status:false,message:'Email already exist'});

    // const checkPhone    =  await User.findOne({where:{phone:phone,type:2,is_deleted:0}});
    // if(checkPhone) return res.json({status:false,message:'Phone already exist'});

    // const checkUsername =  await User.findOne({where:{username:username,type:2,is_deleted:0}});
    // if(checkUsername) return res.json({status:false,message:'Username already exist'});
  
    
    // const hash = bcrypt.hashSync(password, saltRounds);
    const user = await User.update({
      fullname:fullname,
      // username:username,
      email:email,
      phone:phone,
      // assigned_by:req.user.user_id,
      // password:hash,
      type:2
    },{where:{id:id}});
    // const token = jwt.sign({user_id:user.id},'sssshhhhh');
    // return res.json(user)

		return res.json({'status':true,'message':"Project manager updated successfully."})
	}catch(err){
	    console.log(err)
		return res.json({'status':false,"message":"Something is wrong please try again later"}); 
	}
});


  //edit project manager 
  router.post('/delete',accessToken,async(req,res) =>{
    const {id} = req.body;
    if(!id) return res.json({status:false,message:'id is required.'});
    try{
      const manager = await User.findOne(
             {
              where:{id:id,created_by:req.user.user_id,type:2,status:1,is_deleted:0}
            });
       if(!manager) return res.json({status:false,message:'data not found according to this id.'});
       manager.is_deleted =1;
       manager.save();

      return res.json({status:true,message:'Manager deleted successfully.'});
    }catch(err){
      console.log(err)
      return res.json({status:false,messge:'Something is wrong.'});
    }
});



module.exports = router;
