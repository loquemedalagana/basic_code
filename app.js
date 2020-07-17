const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true})); //post요청에서 들어오는 데이터 파싱을 위해

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    const query = req.body.cityName;
    const apiKey = "4415720af8a016d2fe89517156a4cb70";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apiKey +"&units=" + unit;
    https.get(url, (response) => {
        console.log(response.statusCode);
    
        response.on("data", (data) => {
            console.log(data);
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const descrip = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            console.log(temp);
            console.log(descrip);

            const res1 = '<h1>The temperature in '+ query + " is " + temp + " degrees Celcius. </h1>";
            const res2 = "<h2>The weather in " + query+ " is currently " + descrip + ". </h2>"
            const imgURL = "https://openweathermap.org/img/wn/" + icon +"@2x.png";

            res.write(res1); res.write(res2); res.write('<img src = "' + imgURL + '">');
            res.send();
        });
    
    });
});

app.listen(3000, () => console.log("server is running on port 3000"));

