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
    
    database.ref().push({
        trainName,
        trainDest,
        trainStart,
        trainRate,
    });
    
});

database.ref().on("child_added", function (childSnapshot) {

    
    var childName = (childSnapshot.val().trainName);
    var childDest = (childSnapshot.val().trainDest);
    var childRate = parseInt((childSnapshot.val().trainRate));
    var childNext = ((childSnapshot.val().trainStart));
    // var childAway = "";
    
    var timeConverted = moment(childNext, "HH:mm").subtract(1, "day");
    console.log(timeConverted)

    var awayTime = moment().diff(moment(timeConverted), "minutes");
    console.log(awayTime)

    var timeRemaining = awayTime % childRate;
    console.log(timeRemaining);

    var timeUntilTrain = childRate - timeRemaining;
    console.log(timeUntilTrain)

    var nextTrain = moment().add(timeUntilTrain, "minutes");
    var trainNext = moment(nextTrain).format("hh:mmA");

    $(".info-added").append(`<tr><td
    id="table-name">${childName}</td><td
    id="table-destination">${childDest}</td><td
    id="table-rate">${childRate}</td><td
    id="table-next">${childNext}</td><td
    id="table-away">${trainNext}</td></tr>`);
    
}), function (errorObject) {
    console.log("This has failed: " + errorObject.code);
};
