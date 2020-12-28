const axios=require('axios')

module.exports={
    createPayment:async (token,amount,invoice)=>{
        return axios.post(process.env.bkash_base_url+'/payment/create',{
            amount:amount,
            currency:'BDT',
            intent:'sale',
            merchantInvoiceNumber:invoice
        },{
            headers: {
                Authorization:token,
                'X-App-Key':process.env.bkash_app_key
            }
        }).then(res=>{
            return res.data
        }).catch(err=>{
            return err
        })
    },
    executePayment:async (token,paymentID)=>{
        return axios.post(process.env.bkash_base_url+'/payment/execute/'+paymentID,{
            paymentID:paymentID
        },{
            headers: {
                Authorization:token,
                'X-App-Key':process.env.bkash_app_key,
            }
        }).then(async res=>{
            if(!('errorCode' in res.data))
                await logPayment(res.data)
            return res.data
        }).catch(err=>{
            return err
        })
    }
}

const logPayment=async data=>{
    console.log(data.merchantInvoiceNumber)
}