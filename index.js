
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
const path = require('path');
require('dotenv').config();

const app =  express();

console.log(process.env.PORT);

//middlewar
dbConnection();
app.use(express.static('public'))

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

// manage frontend routes 
app.get('*', (req, res)=>{

  res.sendFile(path.resolve(__dirname, 'public/index.html'))
})

app.listen(process.env.PORT, ()=>{
console.log(`App on port ${process.env.PORT}`);
})