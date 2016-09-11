
//colors for shapes
var colors = ['#00aee5', '#00aee5', '#00aee5', '#00aee5', '#00aee5', '#00aee5', '#ff963f'];

//sidebar width
var sideWidth = 55;

//scene column count
var columnCount = 10;

//scene row count;
var rowCount = 14;

//previewCount
var previewCount = 10;

//scene gradient start color
var sceneBgStart = '#8e9ba6';

//scene gradient end color
var sceneBgEnd = '#5c6975';

//preview background color
var previewBg = '#2f2f2f';

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

exports.COLORS =  colors;

exports.SIDE_WIDTH = sideWidth;

exports.ROW_COUNT = rowCount;

exports.COLUMN_COUNT = columnCount;

exports.SCENE_BG_START = sceneBgStart;

exports.SCENE_BG_END = sceneBgEnd;

exports.PREVIEW_BG = previewBg;

exports.PREVIEW_COUNT = previewCount;

exports.GRID_LINE_COLOR = gridLineColor;

exports.PEOPLE_GRID_LINE_COLOR = peopleGridLineColor;

exports.BOX_BORDER_COLOR = boxBorderColor;

exports.DEFAULT_INTERVAL = defaultInterval;

exports.LEVEL_INTERVAL = levelInterval;
