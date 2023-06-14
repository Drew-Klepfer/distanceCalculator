const express = require('express');
const haversine = require('haversine-distance');
/*  const a = { latitude: 37.8136, longitude: 144.9631 }
    const b = { latitude: 33.8650, longitude: 151.2094 }        
    console.log(haversine(a, b)) // 714504.18 (in meters) */
const port = process.env.PORT || 5000;
const app = express();

/* initialize express middleware to parse JSON data to get form data */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post("/", (req, res) => {
    const pointA = req.body.pointA;
    const pointB = req.body.pointB;
    /* parse input to decimal values only */

    console.log(pointA, pointB);
    res.send("data recieved");
    
    findDistance(pointA, pointB);
});

app.listen(port,()=>{
    console.log(`Server started at http://localhost:${port}`)
});


function findDistance(a, b) {
    var haversine_m = haversine(a, b); // meters
    var haversine_km = haversine_m / 1000;

    console.log(haversine_km);
}