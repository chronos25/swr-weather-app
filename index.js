const request = require('request');
const express = require('express');
const http = require('http');
const bodyparser = require('body-parser');
const hostname = 'localhost';
const apiKey = '0cea40c25f813b12fa0dcaef8efa67e8'; 
const app =express();
const port = process.env.PORT || 3000;
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/',function(req,res){
	res.render('index');
	 
})
app.post('/',function(req,res){
	const {city} = req.body;
	console.log(req.body);
	const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    console.log(url);
	request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
    res.status(500)
    res.render('index',{weather:null,error:"Error !! Try Again"});
  } else {
  	try{
	  	let weather = JSON.parse(body);
	  	console.log(weather.Title);
	  	let temp =weather.main.temp;
	  	temp-=273.15;
	  	temp=temp.toFixed(2);
	  	let desc= weather.main.humidity;
	  	let min_temp= weather.main.temp_min;
	  	let max_temp= weather.main.temp_max;
	  	min_temp-=273.15; max_temp-=273.15;
	  	min_temp=min_temp.toFixed(2);
		max_temp=max_temp.toFixed(2);
	  	let country = weather.sys.country;
	  	let lon=weather.coord.lon;
	  	let lat=weather.coord.lat;
	   // let message = `${temp} degrees in ${weather.name}!`;
	    res.render('index',{weather:`Temperature : ${temp} | City : ${weather.name} | Country :${country}`,country:`Humidity :${desc} | Max Temp : ${max_temp} | Min Temp :${min_temp}`,error:null});
	     console.log(`${temp} degrees in ${weather.name}!`);
	     console.log(country);
	}catch(e){
		console.error(e)
		res.render('index',{weather:null,error:"Error !! Try Again"});
	}
  }
})
})

app.listen(port,function(){
	console.log("Started Successfully ");
});

