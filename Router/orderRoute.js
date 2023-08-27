const route =require('express').Router();
const orderCtrl =require('../controller/orderCtrl');


route.post(`/checkout`,orderCtrl.newOrder);

route.get(`/allOrders`,orderCtrl.getAll);




module.exports=route;