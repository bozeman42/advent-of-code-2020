const fs = require('fs')
const data = fs.readFileSync('./input.txt').toString().split('\n').map(x => x.trim()).map(x => x.split(''))

const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2]
]
const result = slopes.map(slope => {
  const [xSlope, ySlope] = slope
  let treeCount = 0
  let x = 0
  for (let y = 0; y < data.length; y += ySlope) {
    const row = data[y]
    if (row[x] === '#') treeCount++
    
    // console.log(row.map((space, index) => {
    //   if (index === x) return `(${space})`
    //   return ` ${space} `
    // })
    // .join('', x))
    x = (x + xSlope) % row.length
  }
  console.log(treeCount)
  return treeCount
}).reduce((acc, trees) => acc * trees, 1)

console.log(result)