const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');
require("dotenv").config();
const app = express();

const PORT = 3000;
const HOST = "localhost";
const APP_SERVICE_URL = "https://jsonplaceholder.typicode.com";

// Logging
app.use(morgan('dev'));

app.get('/info',(req,res,next)=>{
    res.send('This is a proxy service which proxies to Billing & Account APIs.');
});

// authorization
app.use('',(req,res,next)=>{
    if(req.headers.authorization){
        next();
    }else{
        res.sendStatus(403);// forbidden
    }
});
// proxy endpoint
app.use('/json_placeholder', createProxyMiddleware({
    target: APP_SERVICE_URL,
    changeOrigin:true,
    pathRewrite:{
        ['^/json_placeholder']:''
    },
}));

app.listen(PORT, HOST, () => {
    console.log(`Starting proxy at ${HOST}:${PORT}`);
});