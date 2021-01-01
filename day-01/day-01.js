const fs = require('fs')
const data = fs.readFileSync('./input.txt').toString().split('\n').map(x => parseInt(x.trim()))
console.log(data)
console.time('D1P1')
const complements = new Set()
data.forEach(x => {
  if (complements.has(x)) {
    console.log(x, 2020 - x, x * (2020 - x))
    console.timeEnd('D1P1')
  } else {
    complements.add(2020 - x)
  }
})

console.time('D1P2')
for(let i = 0; i < data.length - 2; i++) {
  for(let j = i + 1; j < data.length - 1; j++) {
    let num = data[i] + data[j]
    let comps = new Set()
    for(let k = j + 1; k < data.length; k++) {
      if (comps.has(data[k])) {
        console.log(data[i], data[j], data[k], data[i] * data[j] * data[k])
        console.timeEnd('D1P2')
      } else {
        comps.add(2020 - (data[i] + data[j]))
      }
    }
  }
}