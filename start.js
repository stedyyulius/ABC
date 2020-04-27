var config = {
    apiKey: "AIzaSyA0PzkgtUm7TUvIweYfkoEFD_1YnF_daHw",
    authDomain: "tracker-b765b.firebaseapp.com",
    databaseURL: "https://tracker-b765b.firebaseio.com/",
    storageBucket: "bucket.appspot.com",
};
firebase.initializeApp(config);
// console.log(firebase);

// // Get a reference to the database service
var database = firebase.database();

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

            firebase
                .database()
                .ref(
                    "visitor/" + ip_details.city + "-" + new Date().getTime() + "/",
                )
                .set(data);

        });
}

getLocation();

