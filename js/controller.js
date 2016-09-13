function selectPerson(index) {
    var selected = index + 1; // transform to jquery child index (+1)
    $('.person').removeClass('selected-person');
    if (DEBUG) console.log('selecting person with index', selected)
    var i = 1;
    _.each($('.row.person'), function(el) {
        console.log($(el))
        if (i == selected) {
            $(el).addClass('selected-person');
        }
        i++;
    });

}

function clearGrid(block) {
    $('.assignment').removeClass('assignment');
}

function renderAssignments(people) {
    return;
}

function keyDownHandler(game) {

    if (!e) {
        var e = window.event;
    }
    console.log('event', e);
    if (game.state !== "running") {
        //return;
    }

    switch (e.keyCode) {
        case 37:
            console.log('left arrow')
            game.move("left");
            break;

        case 39:
            console.log('right arrow')
            game.move("right");

            break;

        case 40:
            game.move("down");
            break;

        case 32:
            game.move("drop");
            break;
    }
}

function bindEvents(game) {
    window.addEventListener('keydown', function() {
        keyDownHandler(game);
    }, true);
}