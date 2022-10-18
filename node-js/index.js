const express = require('express');
const app = express();

app.set('view engine','ejs');
app.get('/profile',(req,res)=>{
    const users = {
        name:'Anuj',
        email:'a@a.com',
        city:'abc',
        lang:['c','c++','js','solidity','react','node']
    }
    res.render('profile',{users});
});

app.listen(5000);