const mongoose=require("mongoose");
const assert=require('assert');

const connectDb=(url)=>{
    return mongoose.connect(url,{
        useNewUrlParser:true
    },(err)=>{
        if(err)assert.deepStrictEqual(err,null);
            console.log('Mongo DB connected Successfully');
    })
}

module.exports=connectDb;