const express = require('express')
const router = express.Router()
const multer = require('multer')

const {getAllExpense,getExpenseById,createExpense,updateExpense,deleteExpense} = require('../controllers/expenseController')
// const {checkPhone} =require('../middleware/checkUniqueUser')
const auth =require('../middleWare/auth')


const storage = multer.diskStorage({
    destination: './upload/user',
    filename: (req, file, cb) => {
        return cb(null, file.fieldname + Date.now() + file.originalname)
    }
})
const upload = multer({ 
    storage: storage
})

router.post('/', upload.none(),createExpense);

router.get('/',getAllExpense);

router.get('/:id',auth,getExpenseById);

router.put('/',upload.none(),auth,updateExpense);

router.delete('/:id',auth,deleteExpense);


module.exports = router; 