const express = require('express');
const haversine = require('haversine-distance');
const Coordinates = require('coordinate-parser');
/*  const a = { latitude: 37.8136, longitude: 144.9631 }
    const b = { latitude: 33.8650, longitude: 151.2094 }        
    console.log(haversine(a, b)) // 714504.18 (in meters) */
const port = process.env.PORT || 5000;
const app = express();
const path = require('path')

/* initialize express middleware to parse JSON data to get form data */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/* set view engine */
app.set("view engine", "pug");
app.set('views', path.join( __dirname, 'views'));

app.listen(port,()=>{
    console.log(`Server started at http://localhost:${port}`)
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post("/", (req, res) => {
    const pointA = req.body.pointA;
    const pointB = req.body.pointB;
    
    const regexExp = /^((\-?|\+?)?\d+(\.\d+)?),\s*((\-?|\+?)?\d+(\.\d+)?)$/gi;

    if(!regexExp.test(pointA) || !regexExp.test(pointB)){
        res.sendFile(__dirname + '/public/index.html');
    }

    position1 = new Coordinates(pointA);
    position2 = new Coordinates(pointB);

    //console.log("Point A:" , position1, " Point B:", position2);

    //res.send("data recieved");

    var kilometers = findDistance(position1, position2);

    res.render('index', {
        kilo: kilometers
    });

    //res.send(kilometers);
});

function findDistance(a, b) {
    const A = [a.latitude, a.longitude];
    const B = [b.latitude, b.longitude];
    //console.log(A);
    //console.log(B);
    var haversine_m = haversine(A, B); // meters
    var haversine_km = haversine_m / 1000;

    

    console.log("DISTANCE", haversine_km, "km");

    return haversine_km;
}