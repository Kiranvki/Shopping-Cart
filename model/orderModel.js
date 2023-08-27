const mongoose=require('mongoose')
const Order=new mongoose.Schema({
    orderId:{
        type:String,
        required:true,
        unique:true
    },
    cart:{
        type:Array,
        default:[]
    },
    finalTotal:{
        type:Number,
        // required:true
    },
},{
    collection:"orders",
    timestamps:true
})

module.exports=mongoose.model("Orders",Order)