var NUMBER_ROWS = 10;
var PEOPLE_ROWS = 0;

$(document).ready(function() {
    getRandomPeople();
    addRows();
    addPeople();
});

function addRows() {
    var firstPerson = false;
    $('#game-body').html('');
    for (let i = 0; i < NUMBER_ROWS; i++) {
        if (i >= NUMBER_ROWS - PEOPLE_ROWS) {
            if (firstPerson != true) {
                $('#game-body').append('<div class="row person first"><div class="person-zone"></div><div class="play-zone"></div></div>');
                firstPerson = true;
            } else {
                $('#game-body').append('<div class="row person"><div class="person-zone"></div><div class="play-zone"></div></div>');
            }

        } else {
            $('#game-body').append('<div class="row"><div class="dead-zone">|</div><div class="play-zone"></div></div>');
        }

    }
}

function addPeople() {
    $('.person-zone').html('');
    $('.dead-zone').html('');
    $('.person-zone').append('<div class="thumbnail-person"></div>')
    $('.dead-zone').append('<div class="dotted-line"></div>')
}

function getRandomPeople() {
    PEOPLE_ROWS = Math.floor(Math.random() * 6) + 1;
    console.log("Number of people is", PEOPLE_ROWS)
}