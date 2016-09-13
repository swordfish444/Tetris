function createAssignmentArray(x, size) {

    var result = [];
    _.times(NUMBER_DAYS, function(n) {
        if (!x || !size) result.push(0);
        else {
            let index = n - 1; // transform to array index
            if (index >= x && index <= (x + size)) {
                result.push(1);
            } else {
                result.push(0);
            }
        }
    });
    // returns an array of 0's and 1's ( i.e.  [0,0,0,1,1,0,0,0,0,0] )
    return result;
}

function insertAssignmentIntoArray(x, size, arr) {
    x -= 1; // transform to array index
    for (let i = 0; i < arr.length; i++) {
        if (i >= x && i <= (x + size)) {
            arr[i] = 1;
        }
    }
    return arr;
}