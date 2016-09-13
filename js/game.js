$(document).ready(function() {
    var game = new Game({ debug: true })
    game.start();
});

function Game(options = {}) {
    var self = this;
    this.block = { x: -1, y: -1, size: 0, land: false };
    this.settings = {
        DROP_INTERVAL: 1000, // interval which block automatically moves downwards
        GAME_INTERVAL: 20
    };
    this.people = [];
    this.selected_index = 0;
    this.score = 0;
    this.level = null;
    this.debug = options.debug || false; // set true to see grid + output
    this.interval_id_block = null;
    this.interval_id_game = null;
}

Game.prototype.start = function() {
    var self = this;
    self.initializeGame(DEMO);
}

Game.prototype.initializeGame = function(is_demo) {
    var self = this;
    self.level = self.initializeLevel(1);
    self.initializePeople(is_demo ? null : self.level.number_people);
    self.initializeGrid();
    self.initializeGameLoop();
    selectPerson(self.selected_index);
}

Game.prototype.initializeLevel = function(level) {
    var self = this;
    var config = _.clone(LEVEL_MAP[level])
    return config;
}

Game.prototype.initializeGrid = function() {
    var self = this;
    var firstPerson = false;
    var firstRow = false;
    var divs = [];
    _(10).times(function(n) { divs.push('<div class="grid-block"></div>') });

    $('#game-body').html('');
    for (let i = 0; i < NUMBER_ROWS; i++) {
        if (i >= NUMBER_ROWS - self.people.length) {
            if (firstPerson != true) {
                $('#game-body').append('<div class="row person first"><div class="person-zone"><div class="thumbnail-person"></div></div><div class="play-zone">' + divs.join("") + '</div></div>');
                firstPerson = true;
            } else {
                $('#game-body').append('<div class="row person"><div class="person-zone"><div class="thumbnail-person"></div></div><div class="play-zone">' + divs.join("") + '</div></div>');
            }

        } else {
            if (firstRow != true) {
                $('#game-body').append('<div class="row grid-row first-row"><div class="dead-zone"><div class="dotted-line"></div></div><div class="play-zone">' + divs.join("") + '</div></div>');
                firstRow = true;
            } else {
                $('#game-body').append('<div class="row grid-row"><div class="dead-zone"><div class="dotted-line"></div></div><div class="play-zone">' + divs.join("") + '</div></div>');
            }
        }
    }
}

Game.prototype.initializePeople = function(amount) {
    var self = this;
    self.people = [];
    // initialize with random number of people
    // for demo mode if no amount is provided
    amount = amount || Math.floor(Math.random() * 6) + 1;

    _.times(amount, function(n) {
        if (DEBUG) console.log('Adding person #', n);
        self.addPerson();
    });
}

Game.prototype.initializeGameLoop = function() {
    var self = this;
    self.interval_id_game = setInterval(function() {
        self.gameLoop();
    }, self.settings.GAME_INTERVAL);
}

Game.prototype.spawn = function() {
    var self = this;
    var size = Math.floor(Math.random() * 5) + 1;
    var x = Math.floor(Math.random() * (10 - size)) + 1;
    self.setBlock(size, x, 1);
    self.block = { x: x, y: 1, size: size, land: false };

    // clear previous drop interval
    clearInterval(self.interval_id);
    // create new drop interval
    self.interval_id = setInterval(function() {
        move('down');
    }, self.settings.DROP_INTERVAL);
}

Game.prototype.move = function(direction) {
    var self = this;
    switch (direction) {
        case 'left':
            self.setBlock(self.block.size, self.block.x - 1, self.block.y);
            break;
        case 'right':
            self.setBlock(self.block.size, self.block.x + 1, self.block.y);
            break;
        case 'down':
            self.setBlock(self.block.size, self.block.x, self.block.y + 1);
            break;
        case 'drop':
            self.setBlock(self.block.size, self.block.x, 10);
            break;
    }
    return;
}

Game.prototype.setBlock = function(size, x, y) {
    var self = this;
    // check if trying to move off grid
    if (x < 0 || (x + size) > 10) return false;

    if (y >= 10) {
        y = 10;
        self.block.land = true;
    }

    // clear blocks
    $(' .grid-row > .play-zone > div').removeClass('assignment');

    for (let i = 0; i < size; i++) {
        // add class to blocks
        let index = x + i;
        $(`.grid-row:nth-child(${y}) > .play-zone > div:nth-child(${index})`).addClass('assignment');
    }

    self.block.x = x;
    self.block.y = y;

    return true;
}

Game.prototype.addPerson = function() {
    var self = this;
    var length = self.people.length;
    if (length >= 10) {
        if (DEBUG) console.error('exceeded the max amount of people');
        return false;
    }
    var person = _.clone(PEOPLE[length]);
    // assignment days are represented as an array
    // of 0's and 1's where 0 is available and 1 is scheduled.
    // multiple arrays represents multiple assignments have occurred
    // on 1 or more days
    person.assignments = [
        createAssignmentArray()
    ];
    self.people.push(person);
    return true;
}

Game.prototype.updateAssignments = function() {
    var self = this;

    var block = self.block;
    var x = block.x - 1; // transform to array index
    var size = block.size;

    var person = _.clone(self.people[self.selected_index]);

    var valid = false;
    for (let j = 0; j < person.assignments.length && valid === false; j++) {
        let overlap = false;
        for (let i = x; i < (x + size); i++) {
            if (person.assignments[j][i] !== 0) overlap = true;
        }
        // check if overlap found
        if (overlap) {
            // check if this is the last assignment row
            // for this person
            if ((j + 1) >= person.assignments.length) {
                // add new assignment row
                person.assignments.push(createAssignmentArray(x, size));
            }
        } else {
            person.assignments[j] = insertAssignmentIntoArray(x, size, person.assignments[j]);
            valid = true; // set flag to exit signify success
        }
        // proceed to next assignment row
    }

    self.people[self.selected_index].assignments = person.assignments;
}

Game.prototype.assignBlock = function() {
    var self = this;
    clearGrid();
    self.updateAssignments();
    renderAssignments(self.people);
}

Game.prototype.gameLoop = function() {
    var self = this;

    // block landed -- assign to person
    if (self.block.land === true) self.assignBlock();

    // other???
}