const fs=require('fs')
const url=require('url')
const path = require('path')
const Category=require('../models/Category')
const Product=require('../models/Product')

module.exports=(req,res)=>{
    req.pathname= req.pathname || url.parse(req.parse).pathname

    if(req.pathname === '/category/add' && req.method==='GET'){
        let filePath = path.normalize(
            path.join(__dirname, '../views/category/add.html'))

        fs.readFile(filePath,(err,data)=>{
            if(err){
                console.log(err)
                return
            }

            res.writeHead(200,{
                'Content-Type' : 'text/html'
            })

            res.write(data)
            res.end()
        })
    }
}