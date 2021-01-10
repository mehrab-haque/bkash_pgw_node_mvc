const fs=require('fs')

module.exports={
    log:async (type,url,request,header,response)=>{
        return
        var string='url : '+url+'\n\nrequest body : \n'+JSON.stringify(request)+'\n\n request headers : \n'+JSON.stringify(header)+'\n\nresponse body : \n'+JSON.stringify(response)
        //fs.writeFileSync('log/'+type+'_'+Date.now(),string)
    }
}