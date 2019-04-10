const request = require('request');
const express = require('express');
const http = require('http');
const hostname = 'localhost';
const app =express();

var mustacheExpress= require('mustache-express');
app.engine('html',mustacheExpress());
app.set('view engine','html');
app.set('views',__dirname+'/view');

const port= 3000;


 app.get('/',(req,res)=>{
const apiKey = '0cea40c25f813b12fa0dcaef8efa67e8';
const {city} = req.query
const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
    res.status(500)
    res.send('Error');
  } else {
  	try{
	  	const weather = JSON.parse(body);
	  	let temp =weather.main.temp;
	  	temp-=273.15;
	  	temp=temp.toFixed(2);
	    message = `${temp} degrees in ${weather.name}!`;
	    res.render('index.html',{message})
	    console.log(message);
	}catch(e){
		res.send("Not Found")
	}
  }
})
});



app.listen(port)
 
