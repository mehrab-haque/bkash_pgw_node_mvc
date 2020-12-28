const app = require ('./app');

const port = process.env.PORT || 4000;
app.listen(port);
console.log(`Server listening at port: ${port}`);

/*const axios=require('axios')
var express = require("express");
var cors = require('cors');
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var base_url = 'https://checkout.sandbox.bka.sh/v1.2.0-beta/checkout';

app.post('/create',function(request,response){
    var data=request.body;
    axios.post(base_url+'/token/grant',{
        app_key: '5tunt4masn6pv2hnvte1sb5n3j',
        app_secret: '1vggbqd4hqk9g96o9rrrp2jftvek578v7d2bnerim12a87dbrrka'
    },{
        headers: {
            username: 'sandboxTestUser',
            password: 'hWD@8vtzw0'
        }
    }).then(res=>{
        console.log('token fetched')
        axios.post(base_url+'/payment/create',{
            amount:'200',
            currency:'BDT',
            intent:'sale',
            merchantInvoiceNumber:'invoice'
        },{
            headers: {
                Authorization:res.data.id_token,
                'X-App-Key':'5tunt4masn6pv2hnvte1sb5n3j'
            }
        }).then(res=>{
            console.log('payment created')
            response.send(JSON.stringify(res.data))
        }).catch(err=>{
            console.log(err)
        })
    }).catch(err=>{
        console.log(err)
    })
});

app.post('/execute',function(request,response){
    var data=request.body;
    axios.post(base_url+'/token/grant',{
        app_key: '5tunt4masn6pv2hnvte1sb5n3j',
        app_secret: '1vggbqd4hqk9g96o9rrrp2jftvek578v7d2bnerim12a87dbrrka'
    },{
        headers: {
            username: 'sandboxTestUser',
            password: 'hWD@8vtzw0'
        }
    }).then(res=>{
        axios.post(base_url+'/payment/execute/'+data.paymentID,{
            paymentID:data.paymentID
        },{
            headers: {
                Authorization:res.data.id_token,
                'X-App-Key':'5tunt4masn6pv2hnvte1sb5n3j'
            }
        }).then(res=>{
            console.log(res.data)
            response.send(JSON.stringify(res.data))
        }).catch(err=>{
            console.log(err)
        })
    }).catch(err=>{
        console.log(err)
    })
});


const port = process.env.port||3000
app.listen(port,function(){
    console.log(`server started on PORT ${port}`);
})*/