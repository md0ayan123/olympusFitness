const userModel = require('../models/user')
module.exports = ({
    checkPhone: async (req, res, next) => {
        try{ 
            let data = await userModel.find({phoneNo:req.body.phoneNo}).exec()
        if (data?.length > 0) {
            return res.json({
                success: false,
                msg: "Number id already registred"
            })
        }
        next()
        }
        catch(err){
            res.json({
                msg:"Error in check user",
                error:err
            })
        }
      
    },
})