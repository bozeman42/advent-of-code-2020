const fs = require('fs')
const { isUndefined } = require('util')
const data = fs.readFileSync('./input.txt').toString().split('\n')

const seats = getSeats(data)

function getSeats(data) {
  return data.map(code => {
    const row = parseInt(code.substr(0,7).replace(/F/g,'0',).replace(/B/g,'1'), 2)
    const col = parseInt(code.substr(7,3).replace(/L/g,'0',).replace(/R/g,'1'), 2)
    const id = 8 * row + col
    return {
      row,
      col,
      id
    }
  })
}

const seatArray = seats.reduce((arr, seat) => {
    if (arr[seat.row] != undefined) {
      arr[seat.row][seat.col] = seat.col
    } else {
      arr[seat.row] = new Array(8)
      arr[seat.row].fill(' ')
      arr[seat.row][seat.col] = seat.col
    }
    return arr
  }, [])
  .map(row => row.join(''))
  .map((row, index) => row + ' ' + index)
console.log(seatArray)
console.log(seats.reduce((max, seat) => {
  return max > seat.id ? max : seat.id
}, 0))

console.log(getSeats(['BFFFBBFRRR']))