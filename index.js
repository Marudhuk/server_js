const express = require('express')
const app = express()
const port = 5000
app.use(express.json())

var cors = require('cors')

app.use(cors())

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'marudhu',
  password : 'Marudhu@02',
  database : 'userDetails'
});
 
connection.connect(function (err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
  });
  

app.get("/getAllCustomer",(req,res)=>{
    connection.query('SELECT * from customer where isActive=1', function (error, results) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.json(results);
      });
})
app.get("/getCustomerById/:id",(req,res)=>{
  connection.query('SELECT * from customer where isActive=1 and id=?',[req.params.id], function (error, results) {
      if (error) throw error;
      console.log('The solution is: ', results);
      res.json(results);
    });
})

app.post("/postData",(req,res)=>{
  console.log(req.body,"reqqq");
  connection.query('insert into customer (name,age,email,isActive) values (?,?,?,?)',[req.body[0].name,req.body[0].age,req.body[0].email,1],(error,results)=>{
    if (error) throw error;
        console.log('The solution is: ', results);
        res.json(results); 
  })
});
 
app.put("/updateDataById/:id",(req,res)=>{
  console.log(req.body,"reqqq");
  connection.query('update customer set name=?,age=?,email=? where id=?',[req.body[0].name,req.body[0].age,req.body[0].email,req.params.id],(error,results)=>{
    if (error) throw error;
        console.log('The solution is: ', results);
        res.json(results);
  })
});

app.put("/deleteDataById/:id",(req,res)=>{
  console.log(req.body,"reqqq");
  connection.query('update customer set isActive=0 where id=?',[req.params.id],(error,results)=>{
    if (error) throw error;
        console.log('The solution is: ', results);
        res.json(results);
  })
});

//template Driven Form
 
app.get("/getAllTemplateData",(req,res)=>{
    connection.query('SELECT * from studentTemplateForm where isActive=1', function (error, results) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.json(results);
      });
});

app.get("/getTemplateDataById/:id",(req,res)=>{
    connection.query('SELECT * from studentTemplateForm where isActive=1 and id=?',[req.params.id], function (error, results) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.json(results);
      });
  })

app.post("/postTemplateData",(req,res)=>{
    console.log(req.body,"reqqq");
    connection.query('INSERT INTO studentTemplateForm (firtsName, lastName, email, gender, married,country,isActive) VALUES (?, ?, ?, ?, ?, ?, ?)',[req.body.firstname,req.body.lastname,req.body.email,req.body.gender,req.body.isMarried,req.body.country,1],(error,results)=>{
      if (error) throw error;
          console.log('The solution is: ', results);
          res.json(results); 
    })
  });

  app.put("/updateTemplateDataById/:id",(req,res)=>{
    console.log(req.body,"reqqq");
    connection.query('update studentTemplateForm set firtsName=?,lastName=?,email=?,gender=?,married=?,country=? where id=?',[req.body.firstname,req.body.lastname,req.body.email,req.body.gender,req.body.isMarried,req.body.country,req.params.id],(error,results)=>{
      if (error) throw error;
          console.log('The solution is: ', results);
          res.json(results);
    })
  });

  app.put("/deleteTemplateDataById/:id",(req,res)=>{
    console.log(req.body,"reqqq");
    connection.query('update studentTemplateForm set isActive=0 where id=?',[req.params.id],(error,results)=>{
      if (error) throw error;
          console.log('The solution is: ', results);
          res.json(results);
    })
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})