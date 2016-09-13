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

function clearGrid() {
    $(' .grid-row > .play-zone > div').removeClass('assignment');
}

function renderAssignments(people) {

}