const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const Product = require('./mongodb');

const template_path = path.join(__dirname,"/templates/views");
const partials_path = path.join(__dirname,"/templates/partials");
app.set("view engine", "hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static("public"));

app.get("/",(req,resp)=>{
  resp.render("main");
})

app.get("/register", (req,resp)=>{
  resp.render("index");
})

app.get("/login",(req,resp)=>{
  resp.render("login");
})

app.post("/register",async (req,resp)=>{
  try{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
   
    
    
      let data = new Product({
        name:name,
        email:email,
        password:password
      });
      let result = await data.save();
      resp.status(201).render("main");
    
    
    
  }catch(error){
    res.status(400).send("email already exist");
  }
  
})


app.post("/login",async (req,res)=>{
try{
      const email = req.body.email;
      const password = req.body.password;

      let data = await Product.findOne({email:email});

      if(data.password === password){
        res.status(400).render("main");
      }else{
        resp.send("password doesn't match");
      }

     
}catch(error){
  res.status(400).send("invalid email");
}
})

app.get('/products', async (req, res) => {
      const products = await Product.find();
        res.json(products);
   
});


app.post("/create",async(req,resp)=>{
        let data = new Product(req.body);
        let result = await data.save();
        console.log(result);
    });

app.listen(2600);