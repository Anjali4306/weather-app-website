const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");



const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/index.html");
});



app.post("/", (req, res) => {

    const query = req.body.cityName;
    const apiKey = "48a9ebfd3c72f0c53af5c483631e82ad";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, (response) => {
        console.log(response.statusCode);

        response.on("data", (d) => {
            const weatherData = JSON.parse(d);
            const weatherDescription = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const windSpeed = weatherData.wind.speed;
            const pressure = weatherData.main.pressure;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<p style='background-color:skyblue;font-size:3rem;border-style: solid;'>Temperature in " + query + " is " + temp + "  degrees celcius.</p>");
            res.write("<p style='background-color:skyblue;font-size:2rem; border-style: solid;'> Weather description - " + weatherDescription + "</p>");
            res.write("<p style='background-color:skyblue;font-size:2rem; border-style: solid;'>Wind speed - " + windSpeed + " Km/hr </h4>");
            res.write("<p style='background-color:skyblue;font-size:2rem ;border-style: solid;'>Pressure -  " + pressure + " mbar </p>");
            res.write("<img style='background-color:lightgreen;border-style: solid;'src=" + imageUrl + "> ");
            res.send();
        });
    });
});

app.listen(3000, () => {
    console.log("server running on port 3000");
});