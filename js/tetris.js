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
                $('#game-body').append('<div class="person-row first"></div>');
                firstPerson = true;
            } else {
                $('#game-body').append('<div class="person-row"></div>');
            }

        } else {
            $('#game-body').append('<div ></div>');
        }

    }
}

function addPeople() {
    $('.person-row').html('');
    $('.person-row').append('<div class="thumbnail-person"></div>')
}

function getRandomPeople() {
    PEOPLE_ROWS = Math.floor(Math.random() * 6) + 1;
    console.log("Number of people is", PEOPLE_ROWS)
}