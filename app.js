const express = require('express');
const haversine = require('haversine-distance');
const Coordinates = require('coordinate-parser');
/*  const a = { latitude: 37.8136, longitude: 144.9631 }
    const b = { latitude: 33.8650, longitude: 151.2094 }        
    console.log(haversine(a, b)) // 714504.18 (in meters) */
const port = process.env.PORT || 5000;
const app = express();

/* initialize express middleware to parse JSON data to get form data */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.listen(port,()=>{
    console.log(`Server started at http://localhost:${port}`)
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post("/", (req, res) => {
    const pointA = req.body.pointA;
    const pointB = req.body.pointB;
    /* parse input to decimal values only */
    var regex = new RegExp("^(?<lat>(-?(90|(\d|[1-8]\d)(\.\d{1,6}){0,1})))\,{1}\s?(?<long>(-?(180|(\d|\d\d|1[0-7]\d)(\.\d{1,6}){0,1})))");

    /* if(regex.test(pointA)) {
        console.log("Success!");
    } else {
        console.log("Please enter valid coordinate points, separated by a comma.")
    } */


    position1 = new Coordinates(pointA);
    position2 = new Coordinates(pointB);

    //console.log("Point A:" , position1, " Point B:", position2);

    res.send("data recieved");
    findDistance(position1, position2);
});

function findDistance(a, b) {
    const A = [a.latitude, a.longitude];
    const B = [b.latitude, b.longitude];
    console.log(A);
    console.log(B);
    var haversine_m = haversine(A, B); // meters
    var haversine_km = haversine_m / 1000;

    console.log("DISTANCE", haversine_km, "km");
}