const route = require('express').Router();
const ProductCtrl = require('../controller/productCtrl')


route.get(`/getAll`, ProductCtrl.getAllProducts);
route.get(`/getCoupon`, ProductCtrl.getCoupon);
route.post(`/create`, ProductCtrl.createProduct)
route.post(`/createCoupon`, ProductCtrl.createCoupon)

module.exports = route