const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Seller = require("../model/sellerModel")

const protect = asyncHandler(async (req, res, next) => {
   let token

   if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // verify token
      const decoded = jwt.verify(token, proces.env.JWT_SECRET)
      // Get seller from the token
      req.user = await Seller.findById(decoded.id).select('-password')


      next()
    } catch (error) {
       console.log(error)
       res.status(401)
       throw new Error("Not authorized")
    }
   }

   if(!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
   }
})

module.exports = { protect }