/**
 All dom definitions and actions
*/
var utils = require('./utils.js');
var consts = require('./consts.js');

var $ = utils.$;

//doms
var scene = $('scene');
var side = $('side');
var info = $('info');
var preview = $('preview');
var level = $('level');
var score = $('score');
var rewardInfo = $('rewardInfo');
var reward = $('reward');
var gameOver = $('gameOver');
var btnRestart = $('restart');
var finalScore = $('finalScore');


//defaults
var SIDE_WIDTH = consts.SIDE_WIDTH;


/**
    Caculate the game container size
*/
var getContainerSize = function(maxW, maxH) {

    var dw = document.documentElement.clientWidth;
    var dh = document.documentElement.clientHeight;

    var size = {};

    size.height = consts.BLOCK_SIZE * consts.ROW_COUNT + consts.HEADER_HEIGHT;
    size.width = consts.BLOCK_SIZE * consts.COLUMN_COUNT + consts.SIDE_WIDTH;

    return size;

};


/**
    Layout game elements
*/
var layoutView = function(container, maxW, maxH) {
    var size = getContainerSize(maxW, maxH);
    var st = container.style;
    st.height = size.height + 'px';
    st.width = size.width + 'px';
    //st.marginTop = (-(size.height/2)) + 'px';
    st.marginLeft = (-(size.width / 2)) + 'px';


    scene.height = consts.BLOCK_SIZE * consts.ROW_COUNT;
    scene.width = consts.BLOCK_SIZE * consts.COLUMN_COUNT;

    //var sideW = size.width - scene.width;
    //side.style.width = sideW + 'px';

    preview.width = 250;
    preview.height = 50;

    gameOver.style.width = scene.width + 'px';

}

/**
    Main tetris game view
*/
var tetrisView = {


    init: function(id, maxW, maxH) {
        this.container = $(id);
        this.scene = scene;
        this.preview = preview;
        this.btnRestart = btnRestart;
        layoutView(this.container, maxW, maxH);
        this.scene.focus();

        rewardInfo.addEventListener('animationEnd', function(e) {
            rewardInfo.className = 'invisible';
        });
    },
    // Update the score
    setScore: function(scoreNumber) {
        score.innerHTML = "$" + scoreNumber.format();
    },
    // Update the finnal score
    setFinalScore: function(scoreNumber) {
        finalScore.innerHTML = scoreNumber;
    },
    // Update the level
    setLevel: function(levelNumber) {
        level.innerHTML = levelNumber;
    },
    // Update the extra reward score
    setReward: function(rewardScore) {
        if (rewardScore > 0) {
            reward.innerHTML = rewardScore;
            rewardInfo.className = 'fadeOutUp animated';
        } else {
            rewardInfo.className = 'invisible';
        }
    },
    // Set game over view
    setGameOver: function(isGameOver) {
        gameOver.style.display = isGameOver ? 'block' : 'none';
    }
};

module.exports = tetrisView;