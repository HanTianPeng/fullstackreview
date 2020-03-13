/*

*/

var isValidSudoku = function(arr) {
    for (let i = 0; i < 9; i++) {
      // 遍历行*列
      let row = new Set(), col = new Set()
      for (let j = 0; j < 9; j++) {
        if (arr[i][j] !== '.') {
          if (row.has(arr[i][j])) return false
          row.add(arr[i][j])
        }
        if (arr[j][i] !== '.') {
          if (col.has(arr[j][i])) return false
          col.add(arr[j][i])
        }
      }
      // 遍历3*3小宫格
      let block = new Set()
      let x = (i / 3 >> 0) * 3, y = i % 3 * 3
      for (let j = 0; j < 9; j++) {
        if (arr[x][y] !== '.') {
          if (block.has(arr[x][y])) return false
          block.add(arr[x][y])
        }
        y++
        if ((j + 1) % 3 === 0) {
          x += 1
          y -= 3
        }
      }
    }
    return true;
  }
