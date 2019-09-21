var firebaseConfig = {
    apiKey: "AIzaSyDTISWFYC4ZGeu-F2dHRc6pSPVl5NWFk6A",
    authDomain: "test-c3c9e.firebaseapp.com",
    databaseURL: "https://test-c3c9e.firebaseio.com",
    projectId: "test-c3c9e",
    storageBucket: "",
    messagingSenderId: "373825459098",
    appId: "1:373825459098:web:baeeefca2835bdcc542023"
  };

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#submit").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name").val().trim();
    var trainDest = $("#train-destination").val().trim();
    var trainStart = $("#train-first").val().trim();
    var trainRate = $("#train-rate").val().trim();
    console.log(trainName)

    database.ref().push({
        trainName,
        trainDest,
        trainStart,
        trainRate,
    });
    timeCreation();
});

database.ref().on("child_added", function (childSnapshot) {
    var dateFormat = "YYYY/MM/DD";
    
    console.log(timeConverted)
    
    var childName = (childSnapshot.val().trainName);
    var childDest = (childSnapshot.val().trainDest);
    var childRate = (childSnapshot.val().trainRate);
    var childNext = "Hold";
    var childAway = "Hold";
    
    $(".info-added").append(`<tr><td
    id="table-name">${childName}</td><td
    id="table-destination">${childDest}</td><td
    id="table-rate">${childRate}</td><td
    id="table-next">${childNext}</td><td
    id="table-away">${childAway}</td></tr>`);
    
}), function (errorObject) {
    console.log("This has failed: " + errorObject.code);
};

function timeCreation (){
    var timeConverted = moment(trainStart, "HH:mm").subtract(1, "day");
    console.log(timeConverted)
    var currentTime = moment();

}
