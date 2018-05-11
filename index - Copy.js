const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var mysql = require('mysql');
var sql;
var con = mysql.createConnection({
  host: "us-cdbr-iron-east-04.cleardb.net",
  user: "b4a0c25955550e",
  password: "7e427aa6",
  database: "heroku_9473040638a9d16"
});
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/detail', (req, res) => res.render('pages/details'))
  .get('/new', (req, res) => res.render('pages/new'))
  .get('/detailById', function (req, res) { 
    
      con.connect(function(err) {
        if (err) {
          con.end();
          console.error(err);
          return;
          }
      con.query("SELECT * FROM `heroku_9473040638a9d16`.`pet` where id="+req.query.id, function (err, result, fields) {
        if (err) {
        con.end();
        console.error(err);
        return;
        }
      
        console.log(result);
        res.send(result);
      });
    });

  })
  .get('/list_pets', function (req, res) {   

    if (req.query.id!=null){
sql="SELECT * FROM `heroku_9473040638a9d16`.`pet` where id="+req.query.id;
    }
    else{
sql="SELECT * FROM `heroku_9473040638a9d16`.`pet`";
    }
    con.connect(function(err) {
      if (err) {
        con.end();
        console.error(err);
        return;
        }
      con.query(sql, function (err, result, fields) {
        if (err) {
          con.end();
          console.error(err);
          return;
          }
        console.log(result);
        res.send(result);
      });
    });

    
 })
 .get('/process_get', function (req, res) {
  // Prepare output in JSON format
   sql="INSERT INTO `heroku_9473040638a9d16`.`pet` (`name`,`type`,`breed`,`location`,`lat`,`longi`)VALUES('"+req.query.name+"','"+req.query.type+"','"+req.query.breed+"','"+req.query.location+"','"+req.query.latitude+"','"+req.query.longitude+"');  ";
  con.query(sql, function (err, result, fields) {
    if (err) {
      con.end();
      console.error(err);
      return;
      
  }
  else{
    res.send("sucessfuly added");
  }
    
  });


  // response = {
  //    first_name:req.query.location,
  //    last_name:req.query.name
  // };
  // console.log(response);
  // res.end(JSON.stringify(response));
})
.listen(PORT, () => console.log(`Listening on0 ${ PORT }`))







// var con = mysql.createConnection({
//   host: "localhost",
//   user: "admin",
//   password: "admin",
//   database: "petdb"
// });


// con.connect(function(err) {
//   if (err) {
//   console.log("error created");
//   }
//   else{
//   console.log("Connected!");
//   }
//   var sql = "CREATE TABLE pet (ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,name VARCHAR(25),type VARCHAR(25),breed VARCHAR(25),location VARCHAR(25), lat VARCHAR(25), longi VARCHAR(25),CONSTRAINT UC_Pet UNIQUE (ID,name))";
//   con.query(sql, function (err, result) {
//     if (err) {
//     console.log("error created");
//     }
//     else{
//     console.log("Table created");
//     }
//   });
// });



