const route =require('express').Router();
const orderCtrl =require('../controller/orderCtrl');
const applyDiscountMiddleware=require('../middlware/discount')


route.post(`/checkout`,applyDiscountMiddleware,orderCtrl.newOrder);

route.get(`/allOrders`,orderCtrl.getAll);




module.exports=route;