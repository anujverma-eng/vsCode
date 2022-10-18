const express = require('express');
const path = require('path');
const app = express();
const route =express.Router();
const publicPath = path.join(__dirname,'/public');

const reqFilter =(req,res,next)=>{
    if(!req.query.age){
        res.send("You Cannot access this page");
    }else if(req.query.age<18){
        res.send("You Cannot access this page");
    }else{
        next();
    }
}

route.use(reqFilter);
// app.set('view engine','ejs');
// app.get('/profile',(req,res)=>{
//     const users = {
//         name:'Anuj',
//         email:'a@a.com',
//         city:'abc',
//         lang:['c','c++','js','solidity','react','node']
//     }
//     res.render('profile',{users});
// });

app.get('/',(req,res)=>{
    res.sendFile(`${publicPath}/index.html`)
});
route.get('/about',(req,res)=>{
    res.sendFile(`${publicPath}/about.html`)
});
app.get('/contact',(req,res)=>{
    res.sendFile(`${publicPath}/contact.html`);
});
app.get('*',(req,res)=>{
    res.sendFile(`${publicPath}/404.html`);
});

app.use(route);

app.listen(5000);

// app.get('',(req,res)=>{
//     res.send("This is Hello");
// });
// app.get('/about',(req,res)=>{
//     res.send("This is About");
// });
// app.get('/pricing',(req,res)=>{
//     res.send("This is Pricing");
// });

// app.listen(8000);