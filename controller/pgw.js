const tokenService=require('../service/token')
const paymentService=require('../service/payment')

module.exports = {
    create : async (req,res) =>{
        console.log('create')
        var token = await tokenService.getToken()
        var createPayload=await paymentService.createPayment(token,req.body.amount,req.body.invoice)
        res.status(200).send(JSON.stringify(createPayload))
    },
    execute : async (req,res) =>{
        console.log('eecute')
        var token = await tokenService.getToken()
        var executePayload=await paymentService.executePayment(token,req.body.paymentID)
        res.status(200).send(JSON.stringify(executePayload))
    },
    query : async (req,res) =>{
        var token = await tokenService.getToken()
        var queryPayload=await paymentService.queryPayment(token,req.body.paymentID)
        res.status(200).send(JSON.stringify(queryPayload))
    },
    search : async (req,res) =>{
        var token = await tokenService.getToken()
        var searchPayload=await paymentService.searchPayment(token,req.body.trxID)
        res.status(200).send(JSON.stringify(searchPayload))
    }
}