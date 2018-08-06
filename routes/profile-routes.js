var router=require('express').Router();

var authCheck=(req,res,next)=>{
  if(!req.user){
    //if user is not logged inspect
    res.redirect('/auth/login');
  }else{
    //if logged inspect
    next();
  }
};


router.get('/',authCheck,(req,res)=>{
  res.render('profile',{user:req.user});
});

module.exports=router;
