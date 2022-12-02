const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Seller = require('../model/sellerModel')

// @desc register new seller
// @route  POST /api/seller
// @access public
const registerSeller = asyncHandler(async (req, res) => {
    const { sellername, email, password, image,  price, description, niche, tag } = req.body

    if(!sellername || !email || !password || !image || !price || !description || !niche || !tag) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // check if seller exists
    const sellerExists = await Seller.findOne({email})

    if(sellerExists) {
        res.status(400)
        throw new Error ('Seller already exists')
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create seller
    const seller = await Seller.create({
        sellername,
        email,
        password: hashedPassword,
        image,
        price,
        description,
        niche,
        tag
    })

    if (seller) {
        res.status(201).json({
            _id: seller.id,
            sellername: seller.sellername,
            email: seller.email,
            sellerId: seller.id,
            productId: seller.id,
            image: seller.image,
            price: seller.price,
            description: seller.description,
            nicheId: seller.id,
            niche: seller.niche,
            tag: seller.tag,
            token: generateToken(seller._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid seller data')
    }
})
// @desc authenticate seller
// @route  POST /api/seller/login
// @access Private
const loginSeller = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    //check for seller email
    const seller = await Seller.findOne({email})

    if(seller && (await bcrypt.compare(password, seller.password))) {
        res.json({
            _id: seller._id,
            sellername: seller.sellername,
            email: seller.email,
            token: generateToken(seller._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
    res.status(200).json({ message: 'Login seller' })
})

// @desc get seller data
// @route  GET /api/seller/data
// @access Private
const getSellerData = asyncHandler(async(req, res) => {
    const {_id, sellername, email} = await Seller.findById(req.user.id)
   
    res.status(200).json({
        id: _id,
        sellername,
        email,
    })
})


// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}
// @desc Update seller
// @route  PUT /api/seller/:id
// @access Private
//const updateSeller = asyncHandler (async (req, res) => {
//   res.status(200).json({ message: `Update Seller ${req.params.id}` })
//})

// @desc delete seller
// @route  DELETE /api/seller/:id
// @access Private
//const deleteSeller = asyncHandler (async (req, res) => {
//    res.status(200).json({ message: `delete Seller ${req.params.id}` })
//})

module.exports = {
    registerSeller,
    loginSeller,
    getSellerData
}