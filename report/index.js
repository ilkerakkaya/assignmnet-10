const express = require('express');

const bodyParser=require('body-parser');

const app = express();

const {calculator}=require('./helper');

const moment = require('moment');

const fs= require('fs');



app.use(bodyParser.json());


var todos =['uc', 'kac','zibar'];





app.get ('/', (require)=>{
    res.send('hi');
})

// question 1
app.get('/calculator/:num1/:num2/:operator', (req, res)=>{
    let {num1, num2, operator}=req.params;

    console.log(req.params);
    res.send(String(calculator(num1,num2,operator)));
})

// 

// Question2
app.get('/todo',(req, res)=>{
    res.send(todos);

});
// 

app.post('/todo',  (req, res)=>{
    console.log(req.body);

    todos.push(req.body.todo)
    res.send(todos);
})


app.delete('/todo/:todo',(req,res)=>{
    let{todo}=req.params;
    console.log(todo);

    todos= todos.filter((x)=> x !== todo);

    res.send(todos);

})



app.get('/future/:hours',(req,res) =>{

    let futureDate= moment()
    .add(req.params.hours, 'hours')
    .format('mm dd');
    
    res.send(futureDate);
});




app.post('/login',(req,es)=>{

    let {username, password}=req.body;

    if(username === 'admin' && password ==='password'){

        res.send('success');
    } else{
        res.sendStatus(401);
    }
   
    res.send(req.body);
});






app.post('/report',(req,res)=>{

    let{customer}=req.body;

    
    // let isDirExist=    fs.existsSync('./report');

    // if(!isDirExist){
        // fs.mkdirSync('/report');
    // }

    // fs.mkdirSync('./report');

    // fs.writeFileSync('/report/${customer}.json', JSON.stringify(req.body));

   
    try{

        fs.writeFileSync('/report/${customer}.json', JSON.stringify(req.body));

    }catch (error){
        res.send('error');
        return;

    }

    res.send('saved'); 



    });


  app.get('/report',(req,res)=>{
     let dir = fs.readdirSync('/report');

     let costumers=dir.map(customer=>customer.replace('.json', ''));
  })



app.listen(3000, ()=>{
    console.log('hi huy');
});


