const express = require('express')
const router = express.Router()
const multer = require('multer')

const { createUsers,getAllUsers,getUsersById,loginUsers,updateUsers,deleteUsers} = require('../controllers/userController')
const {checkPhone} =require('../middleWare/checkUniqueUser')
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

router.post('/register', upload.none(),checkPhone,createUsers);
    
router.post('/login',upload.none(),loginUsers);

// router.get('/dashboard',auth,getUserDashboards);

router.get('/',getAllUsers);

router.get('/:id',getUsersById);

router.put('/',upload.none(),updateUsers);

router.delete('/:id',deleteUsers);



module.exports = router; 