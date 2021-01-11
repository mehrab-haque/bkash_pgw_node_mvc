module.exports={
    get : async (req,res) =>{
        res.status(200).send({
            hello:'world'
        })
    },
    post:async (req,res) =>{
        res.status(200).send({
            result:req.body.num1*req.body.num2
        })
    }
}