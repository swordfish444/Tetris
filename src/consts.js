//colors for shapes
var colors = ['#00aee5', '#00aee5', '#00aee5', '#00aee5', '#00aee5', '#00aee5', '#ff963f'];

//sidebar width
var sideWidth = 50;

var headerHeight = 100;

//scene column count
var columnCount = 8;

//var canvasWidth = 500;
//var canvasHeight = 500;

//starting canvas rows
//as if no people on screen
var rowCount = 8;

var blockSize = 105;

//previewCount
var previewCount = 5;

//scene gradient start color
var sceneBgStart = '#f3f3f3';

//scene gradient end color
var sceneBgEnd = '#f3f3f3';

//preview background color
var previewBg = '#e6e6e6';

//grid line color
var gridLineColor = 'rgba(233,233,233,0.2)';

//people grid line color
var peopleGridLineColor = 'rgba(0,174,229,0.7)';

//box border color
var boxBorderColor = 'rgba(255,255,255,0.5)';

// Game speed
var defaultInterval = 600;

// Level update interval
var levelInterval = 120 * 1000;

var person = {
    height: 55
};

var exports = module.exports = {};

exports.PERSON = person;

exports.COLORS = colors;

exports.SIDE_WIDTH = sideWidth;

exports.HEADER_HEIGHT = headerHeight;

exports.ROW_COUNT = rowCount;

exports.COLUMN_COUNT = columnCount;

exports.BLOCK_SIZE = blockSize;

exports.SCENE_BG_START = sceneBgStart;

exports.SCENE_BG_END = sceneBgEnd;

exports.PREVIEW_BG = previewBg;

exports.PREVIEW_COUNT = previewCount;

exports.GRID_LINE_COLOR = gridLineColor;

exports.PEOPLE_GRID_LINE_COLOR = peopleGridLineColor;

exports.BOX_BORDER_COLOR = boxBorderColor;

exports.DEFAULT_INTERVAL = defaultInterval;

exports.LEVEL_INTERVAL = levelInterval;