const express=require('express')
var bodyParser= require('body-parser')
const mongoose=require('mongoose')

const app= express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({

    extended:true
}))

mongoose.connect('mongodb://Localhost:27017/mydb',{
    useNewUrlParser:true,
    useUnifiedTopoLogy:true
});

const db=mongoose.connection;

db.on('error',()=>console.log("Error in connecting to database"));
db.once('open',()=>console.log("Connected to Database"));

app.post("/sign_up",(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const phno=req.body.phno;
    const food=req.body.food;
    const passward=req.body.passward;

    const data={
        "name":name,
        "email":email,
        "phno":phno,
        "food":food,
        "passward":passward
    }
    
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully")
    });

    return res.redirect('signup_success.html')
})

app.get("/",(req,res)=>{
    res.set({ 
       "Allow-access-Allow-Origin": "*"
    })  
    return res.redirect('index.html');    
}).listen(3000);

console.log("server running on port")



