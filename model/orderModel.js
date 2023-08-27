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
    totalAmount:{
        type:Number,
        // required:true
    },
    amountOwed:{
        type:Number,
    }
},{
    collection:"orders",
    timestamps:true
})

module.exports=mongoose.model("Orders",Order)