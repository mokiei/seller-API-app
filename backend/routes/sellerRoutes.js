const express = require('express')
const router = express.Router()
const { getSeller, setSeller, updateSeller, deleteSeller } = require('../controllers/sellerController')

router.route('/').get(getSeller).post(setSeller)
router.route('/:id').put(updateSeller).delete(deleteSeller)


module.exports = router