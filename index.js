const express = require('express')
const app = express()
const port = 4000;
app.use(express.json());





var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "crm"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});


////login
app.post("/loginapi", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;



  let sql = "SELECT  txtEmail FROM tblusers where txtEmail='" + username + "' and txtPassword='" + password + "'";

  ; 
  con.query(sql,
    function (err, result) {
      if (err) throw err;
      console.log(result);
      if (result == '') {
        res.send("username and password is incorrect");
      }
      else {
        res.send("Success!!")
      }

    });
});
// signup
app.post("/signupapi", (req, res) => {
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let email = req.body.email;
  let password = req.body.password;
  let repassword = req.body.repassword;

  let sql =
    "SELECT txtFirstName,txtEmail FROM tblusers where txtEmail='" + email + "'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);

    if ((email != "") & (firstname != "")) {
      if (result != "") {
        res.send("user already exist please login" + JSON.stringify(result));

      } else {
        let sqlinsert = "insert into tblusers(txtFirstName,txtLastName,txtEmail,txtPassword) values('" + firstname + "','" + lastname + "','" + email + "','" + password + "') ;";
        con.query(sqlinsert, function (err, result1) {
          if (err) throw err;
          console.log("inserted" + result1);
          res.send("user added")
        });
      }

    } else {
      res.send("email and firstname mandatory");
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

//////verify
app.post("/verifyapi", (req, res) => {
    let email = req.body.email;
    let otp = req.body.otp;
  
    let sql = "SELECT id FROM crm.tblusers where txtOTP='" + otp + "' and txtEmail='"+ email +"';";
  
    ;
    con.query(sql, function (err, result) {
      console.log(result);
      if (err) throw err;
      console.log(result);
      if (result != "") {
        res.send("verified!!!");
      }
      else if (result == otp) {
        res.send("You have Successfully Registered!!");
      }
      else {
        res.send("incorrect otp")
      }
  
    });
  });

  ////////resend
  app.post("/resendapi", (req, res) => {
    let email = req.body.email;
    let otp = req.body.otp;
  
    let sql = "SELECT id FROM crm.tblusers where txtOTP='" + otp + "' and txtEmail='"+ email +"';";
  
    ;
    con.query(sql, function (err, result) {
      console.log(result);
      if (err) throw err;
      console.log(result);
      if (result != "") {
        res.send("verified!!!");
      }
      else  {
        res.send("resend!!!");
      }
     
    });
  });
 
  //////getuserlistwith filter





  ////getsingleprofile
  app.post("/getsingleprofile", (req, res) => {
    let email = req.body.email;
    let sql = "select txtFirstName,txtLastName,txtEmail,txtPhonenumber from tblusers where txtEmail = '" + email + "';"
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("result")
      if (result != "") {
        res.send("result " + JSON.stringify(result))
      }
      else {
        res.send("Does Not Exist")
      }
    });
  });



  ////insertsingleprofile

  app.post("/insertsingleprofile", (req, res) => {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let Phonenumber = req.body.Phonenumber;
    let dtCreatedOn = req.body.dtCreatedOn;
    let password = req.body.password;
    let sql = "select txtEmail from tblusers where txtEmail =  '" + email + "';"
    let sql1 = "insert into tblusers(txtFirstName,txtLastName,txtEmail,txtPassword,txtPhonenumber,dtCreatedOn) values ('" + firstname + "','" + lastname + "','" + email + "','" + password + "','" + Phonenumber + "','" + dtCreatedOn + "');"
    if (firstname == "") {
      res.send("Firstname is empty")
    }
    if (lastname == "") {
      res.send("Lastname is empty")
    }
    if (email == "") {
      res.send("Email is empty")
    }
    if (password == "") {
      res.send("Date of birth is empty")
   
    }
    if (Phonenumber == "") {
      res.send("phone number is empty")
      
    }
    if (dtCreatedOn == "") {
      res.send("dtCreatedOn is empty")
     
    }
    
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Result = " + JSON.stringify(result))
      if (result != "") {
        res.send("Profile already exists!")
       
      }
      else {
        con.query(sql1, function (err, result) {
          if (err) throw err;
          res.send("Profile Inserted!")
          console.log("New user profile details inserted")
          
        });
      }
    });
  });



  ////updatesingleprofile

















