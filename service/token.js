const fs=require('fs')
const axios=require('axios')
const logger=require('./onBoardingLogger')

const fetchToken=async ()=>{
    try{
        var tokenData=JSON.parse(fs.readFileSync('token.json','utf8'))
        if(tokenData.deadline>Date.now()+60000)return tokenData.id_token
        else {
            var requestURL=process.env.bkash_base_url + '/token/refresh'
            var requestBody={
                app_key: process.env.bkash_app_key,
                app_secret: process.env.bkash_app_secret,
                refresh_token: tokenData.refresh_token
            }
            var requestHeaders={
                username: process.env.bkash_username,
                password: process.env.bkash_password
            }
            return axios.post(requestURL,requestBody, {
                headers: requestHeaders
            }).then(async res => {
                res.data['deadline'] = Date.now() + res.data.expires_in * 1000
                fs.writeFileSync('token.json', JSON.stringify(res.data))
                return res.data.id_token
            }).catch(err => {
                console.log(err)
                return ''
            })
        }
    }catch(e){
        var requestURL=process.env.bkash_base_url+'/token/grant'
        var requestBody={
            app_key: process.env.bkash_app_key,
            app_secret: process.env.bkash_app_secret,
        }
        var requestHeaders={
            username: process.env.bkash_username,
            password: process.env.bkash_password
        }
        return axios.post(requestURL,requestBody,{
            headers: requestHeaders
        }).then(async res=>{
            await logger.log('Grant API',requestURL,requestBody,requestHeaders,res.data)
            res.data['deadline']=Date.now()+res.data.expires_in*1000
            fs.writeFileSync('token.json',JSON.stringify(res.data))
            return res.data.id_token
        }).catch(err=>{
            console.log(err)
            return ''
        })
    }
}

module.exports={
    getToken:async ()=>{
        var token = await fetchToken()
        return token
    }
}