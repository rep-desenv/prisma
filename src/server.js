const express = require('express')
require('dotenv').config() 

const app = express()

app.use(express.json())
app.get('/', (req, res)=>{
    res.json({msg:'teste executado', bd: process.env.DATABASE_URL})
})

app.listen(4343,()=>console.log('estou executando na porta 4343'))