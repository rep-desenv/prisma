const express = require('express')
require('dotenv').config() 

const app = express()

app.use(express.json())

app.get('/', (req, res)=>{
    res.json({        
        DATABASE_URL: process.env.DATABASE_URL,
        DB_HOST: process.env.DB_HOST
    })
})

app.listen(4343,()=>console.log('estou executando na porta 4343'))