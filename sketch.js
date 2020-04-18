let json;
let city="";
let weather="";
let temp;
let maxTemp;
let minTemp;
let imgUrl;
let id;

let input;
let button;
let show =false;

let urlApi="https://api.openweathermap.org/data/2.5/weather?q=";
let cityName="";
let appid="&lang=ja&units=metric&APPID=YourApiKey";
function preload(){
  //api keyをopenweathermapのサイトから取得してYourApiKeyのところに入れてください！

 
}



function setup() {

  createCanvas(400, 400);
  if(!navigator.geolocation){
   alert("navigator.geolocation is not available"); 
  }
  navigator.geolocation.getCurrentPosition(setPos);
  input=createInput(cityName);
  input.position(20,370);
  button=createButton("送信");
  button.mousePressed(askWeather);
  button.position(20+input.width+5,370);
}
function askWeather(){
  cityName=input.value();
  let url=urlApi+cityName+appid;
  json=loadJSON(url,gotData);
  print(url);
}



function draw() {
  background(128, 219, 255);
  fill(255);
  if(show){
  textSize(24);
  text(city,20,50);
  textSize(18);
  text(weather,20,80);
  text("現在の気温："+temp+"°C",20,120);
  text("最高気温："+maxTemp+"°C",20,150);
  text("最低気温："+minTemp+"°C",20,170);
  image(imgUrl,220,80,120,120);
  }
}

function setPos(position){
 let lat= position.coords.latitude;
 let lng= position.coords.longitude;
  background(255);
  fill(0);
 text("緯度："+nf(lat,2,2)+","+"　経度："+nf(lng,2,2),20,20); 
  
  var apikey = 'please put your apikey';


  var api_url = 'https://api.opencagedata.com/geocode/v1/json'

  var request_url = api_url
    + '?'
    + 'key=' + apikey
    + '&q=' + encodeURIComponent(lat + ',' + lng)
    + '&pretty=1'
    + '&language=en'
    + '&no_annotations=1';
  
   var request = new XMLHttpRequest();
  request.open('GET', request_url, true);

  request.onload = function() {
    // see full list of possible response codes:
    // https://opencagedata.com/api#codes
  //  print(request_url);
    if (request.status == 200){ 
      // Success!
      var data = loadJSON(request_url,setCity);
      //text(data.results[0].formatted,100,200);

    } else if (request.status <= 500){ 
      // We reached our target server, but it returned an error
                           
      console.log("unable to geocode! Response code: " + request.status);
      var data = JSON.parse(request.responseText);
      console.log(data.status.message);
    } else {
      console.log("server error");
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
    console.log("unable to connect to server");        
  };

  request.send();  // make the request

  // see full list of required and optional parameters:
  // https://opencagedata.com/api#forward
}

function setCity(data){
  cityName=data.results[0].components.city;
 // text(cityName,200,200);
  let url=urlApi+cityName+appid;
  json=loadJSON(url,gotData);
}

function gotData(data){
  city=json.name;
  weather=json.weather[0].description;
  temp=json.main.temp;
  maxTemp=json.main.temp_max;
  minTemp=json.main.temp_min;
  id=json.weather[0].icon;
  imgUrl=loadImage("https://openweathermap.org/img/wn/"+id+"@2x.png");
  //02d
  if(data){
   show=true; 
  }

}