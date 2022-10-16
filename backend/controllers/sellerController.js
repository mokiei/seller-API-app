const asyncHandler = require('express-async-handler')
// @desc Get seller
// @route  GET /api/seller
// @access Private
const getSeller = asyncHandler (async (req, res) => {
    res.status(200).json({ message: 'Get goals' })
})

// @desc Set seller
// @route  POST /api/seller
// @access Private
const setSeller = asyncHandler (async (req, res) => {
    if (!req.body.text) {
       res.status(400).json
       throw new Error('Please add a text field')
    }
    res.status(200).json({ message: 'Set goals' })
})

// @desc Update seller
// @route  PUT /api/seller/:id
// @access Private
const updateSeller = asyncHandler (async (req, res) => {
    res.status(200).json({ message: `Update Seller ${req.params.id}` })
})

// @desc delete seller
// @route  DELETE /api/seller/:id
// @access Private
const deleteSeller = asyncHandler (async (req, res) => {
    res.status(200).json({ message: `delete Seller ${req.params.id}` })
})

module.exports = {
    getSeller,
    setSeller,
    updateSeller,
    deleteSeller
}