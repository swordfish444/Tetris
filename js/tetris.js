var NUMBER_ROWS = 10;
var PEOPLE_ROWS = 0;

$(document).ready(function() {
    getRandomPeople();
    addRows();
    addPeople();
    spawnBlock();
});

function addRows() {
    var firstPerson = false;
    var firstRow = false;
    var divs = [];
    _(10).times(function(n) { divs.push('<div class="grid-block"></div>') });

    $('#game-body').html('');
    for (let i = 0; i < NUMBER_ROWS; i++) {
        if (i >= NUMBER_ROWS - PEOPLE_ROWS) {
            if (firstPerson != true) {
                $('#game-body').append('<div class="row person first"><div class="person-zone"></div><div class="play-zone">' + divs.join("") + '</div></div>');
                firstPerson = true;
            } else {
                $('#game-body').append('<div class="row person"><div class="person-zone"></div><div class="play-zone">' + divs.join("") + '</div></div>');
            }

        } else {
            if (firstRow != true) {
                $('#game-body').append('<div class="row first-row"><div class="dead-zone"></div><div class="play-zone">' + divs.join("") + '</div></div>');
                firstRow = true;
            } else {
                $('#game-body').append('<div class="row"><div class="dead-zone"></div><div class="play-zone">' + divs.join("") + '</div></div>');
            }

        }

    }
}

function spawnBlock() {
    var size = Math.floor(Math.random() * 5) + 1;
    var index = Math.floor(Math.random() * (10 - size)) + 1;
    for (let i = 0; i < size; i++) {
        // add class to blocks
        var child = index + i;
        console.log('filling block index', child);
        $(' .first-row > .play-zone > div:nth-child(' + child + ')').addClass('assignment');
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