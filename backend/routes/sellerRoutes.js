const express = require('express')
const router = express.Router()
const { registerSeller, loginSeller, getSellerData  } = require('../controllers/sellerController')
const { protect } = require("../middleware/authMiddleware")

//router.route('/:id').put(updateSeller).delete(deleteSeller)
router.post('/', registerSeller)
router.post('/login', loginSeller)
router.get('/data', protect, getSellerData)

module.exports = router