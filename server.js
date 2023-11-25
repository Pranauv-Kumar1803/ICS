const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.static(__dirname));

app.get('/',(req, res)=>{
    res.sendFile(__dirname + '/index.html');
})

app.get('/vpn_setup.elf',(req, res)=>{
    res.sendFile(__dirname + '/vpn_setup.elf');
})

app.listen(8000,()=>{
    console.log("server running on port 8000");
})