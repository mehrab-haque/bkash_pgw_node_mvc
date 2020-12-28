const fs=require('fs')
const axios=require('axios')

const fetchToken=async ()=>{
    var tokenData=JSON.parse(fs.readFileSync('token.json','utf8'))
    if(tokenData.deadline>Date.now()+60000)return tokenData.id_token
    else
        return axios.post(process.env.bkash_base_url+'/token/refresh',{
            app_key: process.env.bkash_app_key,
            app_secret: process.env.bkash_app_secret,
            refresh_token:tokenData.refresh_token
        },{
            headers: {
                username: process.env.bkash_username,
                password: process.env.bkash_password
            }
        }).then(res=>{
            res.data['deadline']=Date.now()+res.data.expires_in*1000
            fs.writeFileSync('token.json',JSON.stringify(res.data))
            return res.data.id_token
        }).catch(err=>{
            console.log(err)
            return ''
        })
}

module.exports={
    getToken:async ()=>{
        var token = await fetchToken()
        return token
    }
}