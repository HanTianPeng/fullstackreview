/*
    旋转图像:
*/
/*
var temp = matrix[0][0];
matrix[0][0] =  matrix[n-1][0]
matrix[n-1][0] = matrix[n-1][n-1]
matrix[n-1][n-1] = matrix[0][n-1]
matrix[0][n-1] = temp;
*/
var rotate = function(matrix) {
    var n = matrix[0].length;
    for(var i=n-1; i<n-1; i--){
        var temp = matrix[0][0];
        matrix[i][i] =  matrix[n-1-i][i]
        matrix[n-1-i][i] = matrix[n-1-i][n-1-i]
        matrix[n-1-i][n-1-i] = matrix[i][n-1-i]
        matrix[i][n-1-i] = temp;
    }
    return matrix;
};

var matrix = [
    [ 5, 1, 9,11],
    [ 2, 4, 8,10],
    [13, 3, 6, 7],
    [15,14,12,16]  [3][3-2]
  ]; 

var result = [
    [15,13, 2, 5],
    [14, 3, 4, 1],
    [12, 6, 8, 9],
    [16, 7,10,11]
  ]