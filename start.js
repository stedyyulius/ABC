require('dotenv').config();

var config = {
    apiKey: environment.key,
    authDomain: environment.domain,
    databaseURL: environment.url,
    storageBucket: environment.bucket,
};
firebase.initializeApp(config);
// console.log(firebase);

function getLocation() {

    fetch("https://ipapi.co/json/")
        .then(function (response) {
            return response.json();
        })
        .then(function (ip_details) {
            const data = {
                time: new Date().toString(),
                ...ip_details,
            };
            // console.log(ip_details);
            firebase
                .database()
                .ref(
                    "visitor/" + ip_details.city + "-" + new Date().getTime() + "/",
                )
                .set(data);
            // console.log(data);
        });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}

function showPosition(position) {
    fetch("https://ipapi.co/json/")
        .then(function (response) {
            return response.json();
        })
        .then(function (ip_details) {
            const data = {
                lat: position.coords.latitude,
                lng: position.coords.latitude,
                time: new Date(position.timestamp).toString(),
                ...ip_details,
            };
            console.log(ip_details);
            firebase
                .database()
                .ref(
                    "visitor/" + ip_details.city + "-" + new Date().getTime() + "/",
                )
                .set(data);
            console.log(data);
        });
}

getLocation();

