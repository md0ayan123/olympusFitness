const jwt = require('jsonwebtoken')
const { hashSync, compareSync } = require('bcrypt')
const {createMember,getAllMember,getMemberById,updateMember,deleteMember} = require('../services/memberService')
// const dotenv =require('dotenv')
// dotenv.config()

module.exports = ({
    createMembers:async (req, res) => {
        console.log(req.body)
            let data = await createMember(req.body) 
                if (!data) {
                    res.json({
                        success:false, 
                        msg:"Error in member create",
                    })
                } else {
                    res.json({
                        success:true,
                        msg: "member added successfully",
                        result: data,
                    })
                }
    },

    getMemberByIds: async (req, res) => {
        try{
        let data= await getMemberById(req.params)
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
    getAllMembers: async (req, res) => {
        try{
        let data= await getAllMember()
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
    
    updateMembers: async (req, res) => {
        let user = await updateMember(req.body)
            
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
    deleteMembers: async (req, res) => {
        try{
            
            if(req.body.password){
                req.body.password = hashSync(req.body.password, 10)
            }
            let data = await deleteMember(req.body)     
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