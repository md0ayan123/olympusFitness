const express = require('express')
const router = express.Router()
const multer = require('multer')

const {createMembers,getAllMembers,getMemberByIds,updateMembers,deleteMembers} = require('../controllers/memberController')
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

router.post('/', upload.none(),createMembers);

router.get('/',getAllMembers);

router.get('/:id',auth,getMemberByIds);

router.put('/',upload.none(),updateMembers);

router.delete('/:id',auth,deleteMembers);


module.exports = router; 