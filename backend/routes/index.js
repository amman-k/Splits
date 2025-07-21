const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.send("Splits Api is running");
});

module.exports=router;

