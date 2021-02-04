var express = require('express');
var router = express.Router();

const multer = require('multer');

const accessToken = require('../middleware/accessToken');
const {sequelize,User,Jobsite,Product,Product_size,Banner,Order} = require('../models');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


//home page
router.get('/home',accessToken,async(req,res) =>{
  try{
    // console.log('okkkkkkkkkkkkkk')
    const user = await User.findOne(
      {
        where:{id:req.user.user_id},
        attributes:{exclude:['password','forget_password']},
        include:[{
          model:Jobsite,
          as:'jobsite'
        }]
      });

    const product = await Product.findAll({
      where:{status:1,is_deleted:0},
      include:[{
        model:Product_size,
        as:'product_size'
      }]
    });
    

    const banner = await Banner.findAll();
    var job_sites = (user.jobsite) ? user.jobsite.length:0;
    // return res.json(banner)
    if(user) return res.json({status:true,data:{fullname:user.fullname,banner:banner,job_sites:job_sites,product:product},message:'User details'});
  }catch(err){
    console.log(err)
    return res.json({status:false,messge:'Something is wrong.'});
  }
});



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

  


  

// our product list

router.post('/products',accessToken,async(req,res) =>{
  const { offset } = req.body;
  try{
  //  console.log(req.body)
    // const user = await User.findOne(
    //   {
    //     where:{id:req.user.user_id},
    //     attributes:{exclude:['password','forget_password']},
    //     include:[{
    //       model:Jobsite,
    //       as:'jobsite'
    //     }]
    //   });

    const product = await Product.findAll({
      where:{status:1,is_deleted:0},
      include:[{
        model:Product_size,
        as:'product_size'
      }],
      limit: 2,
      offset:offset
    });
    

    // const banner = await Banner.findAll();
    // var job_sites = (user.jobsite) ? user.jobsite.length:0;
    //  return res.json(product)
    if(product) return res.json({status:true,data:{product:product},message:'Product details'});
  }catch(err){
    console.log(err)
    return res.json({status:false,messge:'Something is wrong.'});
  }
});




//order new mates
router.post('/order',accessToken,async(req,res) =>{
  const { category_id,quantity,size,site,expected_receiving_date } = req.body;
  try{
 
    const user = await User.findOne(
      {
        where:{id:req.user.user_id},
     });
   
    var order_id = 'ORDER'+Math.round(999999999 + Math.random()*(999999999-1111111111));
    const order = await Order.create({
        order_id:order_id,
        category_id:category_id,
        quantity:quantity,
        size:size,
        site:site,
        expected_receiving_date:expected_receiving_date
    });
    
    return res.json({status:true,data:{order_id:order_id},message:'Order successfully done.'});
  }catch(err){
    console.log(err)
    return res.json({status:false,messge:'Something is wrong.'});
  }
});


module.exports = router;
