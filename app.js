const express = require('express');
const haversine = require('haversine-distance');
const Coordinates = require('coordinate-parser');
const port = process.env.PORT || 5000;
const app = express();
const path = require('path')

/* initialize express middleware to parse JSON data to get form data */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/* set view engine */
app.set("view engine", "pug");
app.set('views', path.join(__dirname, 'views'));

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

/* Coordinate calculation */
app.post("/", (req, res) => {
    const pointA = req.body.pointA;
    const pointB = req.body.pointB;

    const regexExp = /^((\-?|\+?)?\d+(\.\d+)?),\s*((\-?|\+?)?\d+(\.\d+)?)$/gi;

    if (!regexExp.test(pointA) || !regexExp.test(pointB)) {
        res.sendFile(__dirname + '/public/index.html');
    }

    position1 = new Coordinates(pointA);
    position2 = new Coordinates(pointB);

    const kilometers = findDistance(position1, position2);
    Math.round(kilometers/1000);

    console.log(kilometers);

    res.render('index', {
        kilo: kilometers
    });
});

/* Address calculation */
app.post("/address", (req, res) => {
    const address1 = req.body.address1;
    const address2 = req.body.address2;
});

/* calculate distance between two coordinates */
function findDistance(a, b) {
    const lat1 = a.latitude;
    const lat2 = b.latitude;
    const lon1 = a.longitude;
    const lon2 = b.longitude;

    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344;
        dist = dist.toFixed(3);
        console.log(dist);
        return dist;
    }
}