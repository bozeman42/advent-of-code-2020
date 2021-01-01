const fs = require('fs')
const data = fs.readFileSync('./input.txt').toString().split('\n').map(x => x.trim())

let validPasswordCount = 0

data
  .map(x => x.split(':'))
  .forEach(pair => {
    const [ruleStr, unTrimmedPw] = pair
    const {
      min,
      max,
      letter
    } = parseRule(ruleStr)
    const pw = unTrimmedPw.trim()
    const [p1, p2] = [pw[min-1], pw[max-1]]
    if ((p1 === letter && p2 !== letter) || (p1 !== letter && p2 === letter)) validPasswordCount++
  })

function parseRule(rule) {
  const [rangeStr, letter] = rule.split(' ')
  const [min, max] = rangeStr.split('-').map(x => parseInt(x))
  return {
    min,
    max,
    letter
  }
}



console.log(validPasswordCount)