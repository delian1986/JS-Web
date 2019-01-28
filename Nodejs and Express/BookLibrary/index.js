const env='development'

const express=require('express')
const settings = require('./config/settings')
const database=require('./config/database')
const server=require('./config/server')
const routes=require('./config/routes')

database(settings[env])

const app=express()

server(app)
routes(app)

const port=settings.development.port

app.listen(port,()=>console.log('Server is running on port: '+port))