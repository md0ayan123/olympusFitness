const jwt = require('jsonwebtoken')
const { hashSync, compareSync } = require('bcrypt')
const {getAllExpense,getExpenseById,createExpense,updateExpense,deleteExpense} = require('../services/expenseService')
// const dotenv =require('dotenv')
// dotenv.config()

module.exports = ({
    createExpense:async (req, res) => {
        console.log(req.body)
            let data = await createExpense(req.body) 
                if (!data) {
                    res.json({
                        success:false, 
                        msg:"Error in user create",
                    })
                } else {
                    res.json({
                        success:true,
                        msg: "expenses added successfully",
                        result: data,
                    })
                }
    },

    getExpenseById: async (req, res) => {
        try{
        let data= await getExpenseById()
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
    getAllExpense: async (req, res) => {
        try{
        let data= await getAllExpense()
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
    
    updateExpense: async (req, res) => {
        let user = await updateExpense(req.params)
            
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
    deleteExpense: async (req, res) => {
        try{
            
            if(req.body.password){
                req.body.password = hashSync(req.body.password, 10)
            }
            let data = await deleteExpense(req.body)     
            if (!data) {
                res.json({
                    success: false,
                    msg: "failed to delete"
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
})