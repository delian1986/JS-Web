const fs=require('fs')
const path=require('path')
const db=require('./data')
const dbPath=path.join(__dirname,'./data.js')

function getAllMovies(){
    if(fs.existsSync(dbPath)===false){
        fs.writeFileSync(dbPath,'[]')
        return []
    }

    let json=fs.readFileSync(dbPath).toString() || '[]'
    
    return db

}

module.exports.movies={}

module.exports.movies.getAll=getAllMovies