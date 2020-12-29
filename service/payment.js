const axios=require('axios')
const logger=require('./onBoardingLogger')

module.exports={
    createPayment:async (token,amount,invoice)=>{
        var requestURL=process.env.bkash_base_url+'/payment/create'
        var requestBody={
            amount:amount,
            currency:'BDT',
            intent:'sale',
            merchantInvoiceNumber:invoice
        }
        var requestHeaders={
            Authorization:token,
            'X-App-Key':process.env.bkash_app_key
        }
        return axios.post(requestURL,requestBody,{
            headers: requestHeaders
        }).then(async res=>{
            await logger.log('Create Payment API',requestURL,requestBody,requestHeaders,res.data)
            return res.data
        }).catch(err=>{
            return err
        })
    },
    executePayment:async (token,paymentID)=>{
        var requestURL=process.env.bkash_base_url+'/payment/execute/'+paymentID
        var requestBody={
            paymentID:paymentID
        }
        var requestHeaders={
            Authorization:token,
            'X-App-Key':process.env.bkash_app_key,
        }
        return axios.post(requestURL,requestBody,{
            headers: requestHeaders
        }).then(async res=>{
            await logger.log('Execute Payment API',requestURL,requestBody,requestHeaders,res.data)
            if(!('errorCode' in res.data))
                await logPayment(res.data)
            return res.data
        }).catch(err=>{
            return err
        })
    },
    queryPayment:async (token,paymentID)=>{
        var requestURL=process.env.bkash_base_url+'/payment/query/'+paymentID
        var requestHeaders={
            Authorization:token,
            'X-App-Key':process.env.bkash_app_key,
        }
        return axios.get(requestURL,{
            headers: requestHeaders
        }).then(async res=>{
            await logger.log('Query Payment API',requestURL,{},requestHeaders,res.data)
            return res.data
        }).catch(err=>{
            return err
        })
    },
    searchPayment:async (token,trxID)=>{
        var requestURL=process.env.bkash_base_url+'/payment/search/'+trxID
        var requestHeaders={
            Authorization:token,
            'X-App-Key':process.env.bkash_app_key,
        }
        return axios.get(requestURL,{
            headers: requestHeaders
        }).then(async res=>{
            await logger.log('Search Transaction API',requestURL,{},requestHeaders,res.data)
            return res.data
        }).catch(err=>{
            //console.log(err)
            return err
        })
    }
}

const logPayment=async data=>{
    console.log(data.merchantInvoiceNumber)
}