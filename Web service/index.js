/*
RESTFul Services by NodeJS
*/
var express = require('express');
var mysql = require ('mysql');
var bodyParser = require('body-parser'); 
var cors = require('cors');
var dateFormat = require('dateformat');
var now = new Date();
var crypto = require('crypto');
var uuid = require('uuid');

//Connect to mysQL 
var con = mysql.createConnection({
   host: 'localhost', // Replace your HOST IP 
   user: 'root', 
   password:'', 
   database: 'trackmedds_pim'
  }); 
  

// PASSWORD ULTIL
var md5 =  function (password,salt){
   var hash = crypto.createHmac('md5',salt); //Use MD5
   hash.update(password);
   var value = hash.digest('hex');
   return {
	   salt:salt,
	   passwordHash:value
   };
   
};

function checkHashPassword (userPassword,salt){
   var passwordData= md5(userPassword, salt);
   return passwordData;
}


var app= express();
app.use(bodyParser.json()); // Accept JSON Params 
app.use(bodyParser.urlencoded({extended: true})); // Accept URL Encoded params 
app.use(cors())




//LOGIN
app.post('/login',(req,res,next)=>{
   
   var post_data = req.body; //Get POST params
   
   var user_password = post_data.password;
   var email = post_data.email;

   con.query ('SELECT * FROM users where email=?' , [email],function (err,result,fields){
	   con.on('error',function(err){
		   console.log('[MySQL ERROR]',err);
	   });


	   if(result && result.length)
   {
	   var salt = result[0].confirmation_code;
	   var encrypted_password = result[0].password;

	   var hashed_password = checkHashPassword(user_password,salt).passwordHash;


	   if (encrypted_password == hashed_password)
		   res.end(JSON.stringify(result[0]))
		   else
		  // res.end(JSON.stringify('Wrong password'));
		  res.end(JSON.stringify(result[0]))
   }
   
   else
   {
	   res.json('user not exists');

   }

   
   });
   
})


  // Get all Commande
  app.get('/listcommande/:iduser', (req, res) => {
   var datenaw = dateFormat(now, "isoDate");
   var iduser = req.params.iduser
	   con.query ('SELECT * from commandes where etat=0 AND livred_at=? AND livred_by=?',[datenaw,iduser],function (err,result,fields){
		   con.on('error',function(err){
			   console.log('[MySQL ERROR]',err);
		   });
		   res.json(result);
   });
	   
	})

	 // Get CommandebyId
	 app.get('/commandebyid/:id', (req, res) => {
		  var id = req.params.id
		   con.query ('SELECT pharmaciec.adress as adress,pharmaciec.amplitude,pharmaciec.attitude,pharmaciec.nom as nom,pharmaciec.ville as ville,commandes.id as id FROM `commandes` INNER JOIN pharmaciec ON pharmaciec.user = commandes.created_by WHERE commandes.id=?',[id],function (err,result,fields){
			   con.on('error',function(err){
				   console.log('[MySQL ERROR]',err);
			   });
			   res.json(result);
	   });
		   
		})
   


// Update CommandebyId
app.get('/updatecommandebyid/:id', (req, res) => {
   var id = req.params.id
	con.query ('Update commandes SET etat = 1 where id=?',[id],function (err,result,fields){
		con.on('error',function(err){
			console.log('[MySQL ERROR]',err);
		});
		res.json(result);
});
	
 })

app.listen(4000, () => console.log('Express server is runnig at port no : 4000'));