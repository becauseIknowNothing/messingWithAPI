
const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");

const app=express();
app.use(bodyparser.urlencoded({extended:true}));

app.get("/", function(req,res){
	res.sendFile(__dirname+"/index.html");
});

app.post("/",  function(req,res){
	var crypto=req.body.crypto;
	var fiat=req.body.fiat;
	var amount=req.body.amount;
	var options={
		url:"https://apiv2.bitcoinaverage.com/convert/global",
		method:"GET",
		qs:{
			amount:amount,
			from:crypto,
			to:fiat
		}

	};
	request(options, function(error,response,body){
		console.log(body);
		var data =JSON.parse(body);
		res.write("<p>Current Time is " + data.time + " </p>");
		res.write("<h1>"+ amount + " of "+ crypto + " means " + data.price + " of " + fiat+"!")
		console.log(data.price);
	});
});

app.listen(8080,function(){
	console.log("Server Running at 8080.");
});