const express = require('express')
const app = express()
const port = 4000
app.use(express.json())

var cors = require('cors')

app.use(cors())

var mysql = require('mysql');
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
  

app.get("/getAllEmployee",(req,res)=>{
    connection.query('SELECT * from employee where isactive=1', function (error, results) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.json(results);
      });
})
app.get("/getEmployeeById/:id",(req,res)=>{
  connection.query('SELECT * from employee where isactive=1 and id=?',[req.params.id], function (error, results) {
      if (error) throw error;
      console.log('The solution is: ', results);
      res.json(results);
    });
})

app.post("/postData",(req,res)=>{
  console.log(req.body,"reqqq");
  connection.query('insert into employee (empname,age,email,isactive) values (?,?,?,?)',[req.body.empname,req.body.age,req.body.email,1],(error,results)=>{
    if (error) throw error;
        console.log('The solution is: ', results);
        res.json(results);
  })
});
 
app.put("/updateDataById/:id",(req,res)=>{
  console.log(req.body,"reqqq");
  connection.query('update employee set empname=?,age=?,email=? where id=?',[req.body.empname,req.body.age,req.body.email,req.params.id],(error,results)=>{
    if (error) throw error;
        console.log('The solution is: ', results);
        res.json(results);
  })
});

app.put("/deleteDataById",(req,res)=>{
  console.log(req.body,"reqqq");
  connection.query('update employee set isactive=0 where id=?',[req?.body?.id],(error,results)=>{
    if (error) throw error;
        console.log('The solution is: ', results);
        res.json(results);
  })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})