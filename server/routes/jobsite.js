var express = require('express');
var router = express.Router();

const multer = require('multer');
const { route } = require('.');

const accessToken = require('../middleware/accessToken');
const {sequelize,User,Jobsite} = require('../models');




//get jobsite list
router.get('/list',accessToken,async(req,res) =>{
    try{
      const jobsite = await Jobsite.findAll({
        where:{user_id:req.user.user_id,status:1,is_deleted:0},
        include:[{
          model:User,
          as:'assigned_manager',
          attributes:{exclude:['forget_password','password','email','phone','image','createdAt','updatedAt']},
       }]
      });

      var jobsitedata = [];
      jobsite.forEach(item => {
        jobsitedata.push({
          jobsite_name:item.jobsite_name,
          lat:item.lat,
          long:item.long,
          assigned_project_manager_id:item.assigned_project_manager,
          project_manager_name:item.assigned_manager.fullname,
          expected_completion_date:new Date(item.expected_completion_date).toISOString().split('T', 1)[0]

        })
      });
      const managers_list = await User.findAll({
        where:{created_by:req.user.user_id,status:1,is_deleted:0},
        attributes:{exclude:['forget_password','password','email','phone','image','createdAt','updatedAt']}
      });

      // return res.json(jobsitedata)
      return res.json({status:true,data:{jobsite:jobsitedata,managers_list:managers_list}})
    }catch(err){
      return res.json({status:false,messge:'Something is wrong.'});
    }
});



//add jobsite
router.post('/add',accessToken,async(req,res) =>{
    const {jobsite_name,
        lat,
        long,
        assigned_project_manager,
        start_date,
        expected_completion_date} = req.body;


        // if(!id) return res.json({status:true,message:'id is required.'});
        if(!lat) return res.json({status:true,message:'lat is required.'});
        if(!long) return res.json({status:true,message:'long is required.'});
        if(!assigned_project_manager) return res.json({status:true,message:'assigned_project_manager is required.'});
        if(!start_date) return res.json({status:true,message:'start_date is required.'});
        if(!expected_completion_date) return res.json({status:true,message:'expected_completion_date is required.'});
      

    try{
       const jobsite = await Jobsite.create({
        user_id:req.user.user_id,
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



  //edit jobsite 

router.post('/edit',accessToken,async(req,res) =>{
  const {id}  = req.body;
  if(!id) return res.json({status:true,message:'id is required.'});
  try{
    const jobsite = await Jobsite.findOne({
      where:{id:id,user_id:req.user.user_id,status:1,is_deleted:0},
      include:[{
         model:User,
         as:'assigned_manager',
         attributes:{exclude:['forget_password','password','email','phone','image','createdAt','updatedAt']},
      }]
    });
    const managers_list = await User.findAll({
      where:{created_by:req.user.user_id,status:1,is_deleted:0,type:2},
      attributes:{exclude:['forget_password','password','email','phone','image','createdAt','updatedAt']}
    });

    
    return res.json({status:true,data:{jobsite:jobsite,managers_list:managers_list}})
  }catch(err){
    return res.json({status:false,messge:'Something is wrong.'});
  }
});




  //jobsite update

router.post('/update',accessToken,async(req,res) => {
  const {jobsite_name,
    lat,
    long,
    assigned_project_manager,
    start_date,
    expected_completion_date,id} = req.body;

  if(!id) return res.json({status:true,message:'id is required.'});
  if(!lat) return res.json({status:true,message:'lat is required.'});
  if(!long) return res.json({status:true,message:'long is required.'});
  if(!assigned_project_manager) return res.json({status:true,message:'assigned_project_manager is required.'});
  if(!start_date) return res.json({status:true,message:'start_date is required.'});
  if(!expected_completion_date) return res.json({status:true,message:'expected_completion_date is required.'});

try{
   const jobsite = await Jobsite.update({
    jobsite_name,
    lat,
    long,
    assigned_project_manager,
    start_date,
    expected_completion_date,
   },{where:{id:id,user_id:req.user.user_id}});

  if(jobsite) return res.json({status:true,message:'Jobsite update successfully.'});
}catch(err){
  console.log(err)
  return res.json({status:false,messge:'Something is wrong.'});
}
})
 

// delete jobsite
router.post('/delete',accessToken,async(req,res) => {
  const {id} = req.body;

  if(!id) return res.json({status:true,message:'id is required.'});

try{
   const jobsite = await Jobsite.update({
    is_deleted:1
   },{where:{id:id,user_id:req.user.user_id}});

  if(jobsite) return res.json({status:true,message:'Jobsite deleted successfully.'});
}catch(err){
  console.log(err)
  return res.json({status:false,messge:'Something is wrong.'});
}
})



module.exports = router;
