const jwt = require('jsonwebtoken')
const { hashSync, compareSync } = require('bcrypt')
const { createUser, getAllUser, getUserById, loginUser, updateUser, deleteUser } = require('../services/userService')
// const dotenv =require('dotenv')
// dotenv.config()

module.exports = ({
    createUsers:async (req, res) => {
        console.log(req.body)
        if (req.body.password == req.body.cpassword){
            req.body.password = hashSync(req.body.password, 10)
            let data = await createUser(req.body) 
                if (!data) {
                    res.json({
                        success:false, 
                        msg:"Error in user create",
                    })
                } else {
                    res.json({
                        success:true,
                        msg: "successfully regestred",
                        result: data,
                    })
                }
        } else {
            res.json({
                success: false,
                msg: "Password did't match"
            })
        }
    },

    loginUsers: async (req, res) => {
       let user = await loginUser(req.body)
       if (!user) {
           res.json({  
               success: 0,
               msg: "you have not regestred yet"
            })
            } else {
                var result = compareSync(req.body.password, user.password)
                if (result) {
                    user = JSON.parse(JSON.stringify(user))
                    delete user.password
                    var token = jwt.sign({
                        phoneNo: user.phoneNo
                    },"random")
                    res.json({
                        success: true,
                        msg: "you are loggedin",
                        token: token,
                        result: user
                    })
                } else {
                    res.json({
                        success: false,
                        msg: 'invalid credentials'
                    })
                }
            }
    },
    getAllUsers: async (req, res) => {
        try{
        let data= await getAllUser()
        res.json({
            success: true,
            result: data
        })
        }catch(err){
            res.json({
                success: false,
                result: err
            })
        }    
                
    },    
    getUsersById: async (req, res) => {
        let user = await getUserById(req.params)
            
            if (!user) {
                res.json({
                    success: false,
                    msg: "no records found"
                })
            } else {
                user =JSON.parse(JSON.stringify(user))
                delete user.password
                res.json({
                    success: true,
                    result: user
                })
            }
    },
    updateUsers: async (req, res) => {
        try{
            
            if(req.body.password){
                req.body.password = hashSync(req.body.password, 10)
            }
            let data = await updateUser(req.body)     
            if (!data) {
                res.json({
                    success: false,
                    msg: "failed to update"
                })
            } else {
                res.json({
                    success: true,
                    result: data
                })
            }
        }catch(err){
            res.json({
                success: false,
                err: err
            })
        }
        
    },
    deleteUsers: async (req, res) => {
        try{
            let data = await deleteUser(req.params)
            
            if (!data) {
                res.json({
                    success: false,
                    msg: "failed to delete"
                })
            } else {
                res.json({
                    success: true,
                    result: data,
                    msg:"deleted"
                })
            }
        }catch(err){
            res.json({
                success: false,
                err: err
            })
        }
        
    }
})