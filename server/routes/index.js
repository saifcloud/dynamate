var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const saltRounds = 10;
const {sequelize, User} = require('../models');




//user register
router.post('/register',async(req, res)=>{

	const { fullname,username,email,phone,password } = req.body;
  if(!fullname) throw res.json({'status':false,"message":"Fullname is required"});
  if(!username) throw res.json({'status':false,"message":"Username is required"});
  if(!email) throw res.json({'status':false,"message":"Email is required"});
  if(!phone) throw res.json({'status':false,"message":"Phone number is required"});
  if(!password) throw res.json({'status':false,"message":"Password  is required"});

  
	try{
    const checkEmail    =  await User.findOne({where:{email:email,is_deleted:0}});
    if(checkEmail) return res.json({status:false,message:'Email already exist'});

    const checkPhone    =  await User.findOne({where:{phone:phone,is_deleted:0}});
    if(checkPhone) return res.json({status:false,message:'Phone already exist'});

    const checkUsername =  await User.findOne({where:{username:username,is_deleted:0}});
    if(checkUsername) return res.json({status:false,message:'Username already exist'});
  
    
    const hash = bcrypt.hashSync(password, saltRounds);
    const user = await User.create({fullname,username,email,phone,password:hash});
    const token = jwt.sign({user_id:user.id},'sssshhhhh');
    

		return res.json({'status':true,'data':{token:token},'message':"User registered successfully."})
	}catch(err){
	    console.log(err)
		return res.json({'status':false,"message":"Something is wrong please try again later"}); 
	}
});



//login
router.post('/login',async(req,res) => {
  const {username,password} = req.body;
 try{
   
   const user = await User.findOne({where:{username:username,is_deleted:0}});
   if(!user) return res.json({status:false,message:'Username and passoword does not matched.'});
   var token = jwt.sign({ user_id:user.id }, 'sssshhhhh');
   return res.json({status:true,data:{token:token},message:'Login successfully'})
 }catch(err){
   return res.json({status:false,message:'Something is wrong.'});
 }
});

module.exports = router;
