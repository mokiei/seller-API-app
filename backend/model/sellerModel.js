// define the resources required
const mongoose = require('mongoose')

const sellerSchema = mongoose.Schema({
sellername: {
    type: String,
    required: [true, 'Please add a name']
},
email: {
    type: String,
    required: [true, 'Please add an email']
},
password: {
    type: String,
    required: [true, 'Please add a password']
},
sellerId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "sellerId",
}, 
productId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "productId",
},
image:  {
    type: String,
    required: true,
    unique: true
},
price: { 
    type: Number,
    required: true,
    unique: true
},
description:  {
    type: String,
    required: true,
    unique: true
},
nicheId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "nicheId",
},
niche:  {
    type: String,
    required: true,
    unique: true
},
tag: { 
    type:String,
    required: true,
    unique: true
},
},
{
    timestamps: true
})

module.exports = mongoose.model('Seller', sellerSchema)