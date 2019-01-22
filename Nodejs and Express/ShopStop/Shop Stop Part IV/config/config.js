const path=require('path')

module.exports={
    development:{
        connectionString:
            'mongodb://localhost/ShopStopDatabase',
        rootPath:path.normalize(path.join(__dirname,'../'))
    },
    production:{
        
    }
}