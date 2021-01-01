const fs = require('fs')
const { Z_FILTERED } = require('zlib')

// part 1
const groups1 = fs.readFileSync('./input.txt').toString().split('\n\n').map(group => group.split('\n').join('').split(''))

const counts = groups1
  .map(group => {
    const answers = new Set()
    group.forEach(answer => answers.add(answer))
    return answers.size
  })
const total = counts.reduce((acc, count) => acc + count, 0)
console.log('Part 1', total)

// part 2
const groups = fs.readFileSync('./input.txt').toString().split('\n\n').map(group => group.split('\n'))

const groupAnswers = groups.map(group => {
  return group.map(answers => answers.split(''))
}).map(group => {
  return group[0].filter(answer => {
    return group.every(person => person.includes(answer))
  })
})
const groupTotals = groupAnswers.map(x => x.length)
const total2 = groupTotals.reduce((acc, num) => acc + num, 0)
console.log(total2)